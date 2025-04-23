import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  CircleUser,
  MapPin,
  FileText,
  HeadphonesIcon,
  Settings,
  LogOut,
  ChevronRight,
  Wallet,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from '@/lib/supabase/supabaseClient'
import Image from "next/image"
import Rating from '@mui/material/Rating'
import { Box } from "@mui/material"

interface Trip {
  id: number;
  status: {
    name: string;
  } | null;
  travel_request: {
    id_person: number;
  } | null;
}
interface Rating {
  id: number;
  score_carrier: number;
  id_trip: number;
  trip: {
    id: number;
    id_carrier: number;
    status: {
      name: string;
    } | null;
  } | null;
}


interface RatingEntry {
  score_person?: number;
  score_carrier?: number;
  id_trip: number;
  trip?: {
    id: number;
    id_carrier: number;
    status?: { name: string };
  };
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("")
const [ratingData, setRatingData] = useState<{ rating: number, totalTrips: number }>({ rating: 0, totalTrips: 0 })
  const [isDriverMode, setIsDriverMode] = useState(false)
  const [transitionDuration, setTransitionDuration] = useState("400ms")
  const [userInfo, setUserInfo] = useState<{ first_name: string, first_surname: string } | null>(null)

  const clientMenuItems = [
    { name: "Ciudad", icon: <MapPin size={20} />, path: "/customer/main_view" },
    { name: "Historial de solicitudes", icon: <FileText size={20} />, path: "/customer/request_history" },
    { name: "Soporte Técnico", icon: <HeadphonesIcon size={20} />, path: "/customer/support" },
    { name: "Configuraciones", icon: <Settings size={20} />, path: "/customer/settings" },
  ]

  const driverMenuItems = [
    { name: "Ciudad", icon: <MapPin size={20} />, path: "/carrier/main_view" },
    { name: "Cartera", icon: <Wallet size={20} />, path: "/carrier/wallet" },
    { name: "Historial de viajes", icon: <Clock size={20} />, path: "/carrier/trips_history" },
    { name: "Soporte Técnico", icon: <HeadphonesIcon size={20} />, path: "/carrier/support" },
    { name: "Configuraciones", icon: <Settings size={20} />, path: "/carrier/settings" },
  ]

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)

  // Determinar automáticamente si está en modo conductor o cliente
  useEffect(() => {
    if (pathname) {
      setIsDriverMode(pathname.startsWith('/carrier/main_view') || 
                      pathname === '/carrier/wallet' || 
                      pathname === '/carrier/trips_history' ||
                      pathname === '/carrier/support' ||
                      pathname === '/carrier/settings' ||
                      pathname === '/carrier/profile')
    }
  }, [pathname])

  // Actualizar el ítem activo basado en la ruta actual (incluye perfil)
  useEffect(() => {
    if (pathname) {
      const profilePath = isDriverMode ? "/carrier/profile" : "/customer/profile"

      if (pathname === profilePath) {
        setActiveItem("Perfil")
        return
      }

      const menuItems = isDriverMode ? driverMenuItems : clientMenuItems
      const currentItem = menuItems.find(item => 
        pathname === item.path || pathname.startsWith(`${item.path}/`)
      )

      if (currentItem) {
        setActiveItem(currentItem.name)
      }
    }
  }, [pathname, isDriverMode])

  // Restablecer la duración de la transición después de completar la navegación
  useEffect(() => {
    if (transitionDuration === "300ms") {
      const timer = setTimeout(() => {
        setTransitionDuration("400ms")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [transitionDuration])

  const menuItems = isDriverMode ? driverMenuItems : clientMenuItems

  const toggleMode = () => {
    setTransitionDuration("300ms")
    
    const newMode = !isDriverMode
    setIsDriverMode(newMode)

    onClose()
    
    setTimeout(() => {
      router.push(newMode ? "/carrier/main_view" : "/customer/main_view")
      setActiveItem("Ciudad")
    }, 300) 
  }

  const handleLogout = () => {
    localStorage.removeItem("main_view")  // Limpiar localStorage
    router.push("/login")
    onClose()
  }

  // Función para manejar la navegación al perfil
  const navigateToProfile = () => {
    const profilePath = isDriverMode ? "/carrier/profile" : "/customer/profile"
    router.push(profilePath)
    setActiveItem("Perfil")
    onClose()
  }

  // Obtener el userId desde localStorage
  const userId = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("main_view") || "{}").userId : null;

  // Obtener datos del usuario desde Supabase
  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        const { data, error } = await supabase
          .from("person")
          .select("first_name, first_surname, profile_img") 
          .eq("id", userId)
          .single()
  
        if (error) {
          console.error("Error al obtener los datos del usuario:", error)
          return
        }
  
        setUserInfo({
          first_name: data.first_name,
          first_surname: data.first_surname,
        })
  
        if (data.profile_img) {
          setProfileImageUrl(data.profile_img)
        }
      }
  
      fetchUserInfo()
    }
  }, [userId])
  
  useEffect(() => {
    const fetchRatingAndTripInfo = async () => {
      if (!userId) return;
  
      const isClient = pathname?.startsWith("/customer");
      let totalDeliveredTrips = 0;
      let ratings: RatingEntry[] = [];
  
      if (isClient) {
        const { data: tripData, error: tripError } = await supabase
  .from("trip")
  .select(`id, status ( name ), travel_request ( id_person )`) as unknown as { data: Trip[]; error: Error | null };

        if (tripError || !tripData) {
          console.error("Error al obtener trips:", tripError);
          return;
        }
  

        const clientTrips = tripData.filter(
          (trip) => trip.travel_request?.id_person === userId
        );
  
        totalDeliveredTrips = clientTrips.filter(
          (trip) => trip.status?.name === "Entregado"
        ).length;
  
        const tripIds = clientTrips.map((trip) => trip.id);
  
        const { data: ratingDataRes, error: ratingError } = await supabase
          .from("rating")
          .select("score_person, id_trip");
  
        if (ratingError || !ratingDataRes) {
          console.error("Error al obtener ratings:", ratingError);
          return;
        }
  
        ratings = ratingDataRes.filter((rating) =>
          tripIds.includes(rating.id_trip)
        ) as RatingEntry[];
        } else {
          const { data: ratingDataRes, error: ratingError } = await supabase
          .from("rating")
          .select(`
            id, score_carrier, id_trip,
            trip ( id, id_carrier, status ( name ) )
          `) as unknown as { data: Rating[] | null; error: Error | null };
        
          if (ratingError || !ratingDataRes) {
            console.error("Error al obtener ratings del conductor:", ratingError);
            return;
          }
  
          ratings = ratingDataRes?.filter(
            (r) => r.trip?.id_carrier === userId
          ).map(rating => {
            // Convertir de Rating a RatingEntry
            return {
              ...rating,
              trip: rating.trip || undefined
            } as unknown as RatingEntry;
          }) || [];
          
          // Usando la misma variable ratings que ahora tiene el formato correcto
          totalDeliveredTrips = ratings.filter(
            (r) => r.trip?.status?.name === "Entregado"
          ).length;
        }
  
      const scoreKey: keyof RatingEntry = isClient ? "score_person" : "score_carrier";
  
      const validScores = ratings.filter((r) => typeof r[scoreKey] === "number");
      const sum = validScores.reduce((acc, r) => acc + (r[scoreKey] as number), 0);
      const avg = validScores.length > 0 ? sum / validScores.length : 5;
  
      setRatingData({
        rating: avg,
        totalTrips: totalDeliveredTrips,
      });
    };
  
    fetchRatingAndTripInfo();
  }, [userId, isDriverMode, pathname]);
  
  
  
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#0d2a33] text-white transform h-full",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
      style={{
        transition: `transform ${transitionDuration} ease-in-out`
      }}
    >
      {/* Perfil de usuario */}
      <div 
        className={cn(
          "flex items-center justify-between p-4 border-b border-[#1a3b45] cursor-pointer hover:bg-[#1a3b45] transition-colors",
          activeItem === "Perfil" && "bg-[#16a085]"
        )}
        onClick={navigateToProfile}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1a3b45] flex items-center justify-center overflow-hidden">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt="Foto de perfil"
                width={32}
                height={32}
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <CircleUser size={20} />
            )}
          </div>

          <div>
            <h3 className="text-white text-x2">
              {userInfo ? `${userInfo.first_name} ${userInfo.first_surname}` : "..."}
            </h3>

            <Box display="flex" alignItems="center">
              <Rating
                value={ratingData.rating}
                precision={0.1}
                readOnly
                size="small"
                sx={{
                  color: '#facc15',
                  '& .MuiRating-iconEmpty': { color: '#d1d5db' },
                }}
              />
              <span className="ml-1 text-xs text-gray-300">
                {ratingData.rating.toFixed(2)} ({ratingData.totalTrips})
              </span>
            </Box>
          </div>
        </div>
        <ChevronRight size={20} />
      </div>

      {/* Ítems del menú */}
      <div className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            href={item.path}
            key={item.name}
            onClick={() => {
              setActiveItem(item.name)
              onClose() // cerrar el menú al hacer clic
            }}
            className={cn(
              "flex items-center gap-3 p-4 hover:bg-[#1a3b45] transition-colors",
              activeItem === item.name && "bg-[#16a085]",
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Botón de cerrar sesión */}
      <div className="p-4 border-t border-[#1a3b45]">
        <button
          className="flex items-center gap-3 w-full justify-center py-3"
          onClick={handleLogout}
        >
          <span>Cerrar Sesión</span>
          <LogOut size={18} />
        </button>
      </div>

      {/* Botón de cambiar modo */}
      <div className="p-4 bg-[#0a1f26]">
        <button
          className="w-full bg-[#16d6a1] text-[#0d2a33] font-medium py-3 rounded-md hover:bg-[#14c091] transition-colors"
          onClick={toggleMode}
        >
          {isDriverMode ? "Modo cliente" : "Modo conductor"}
        </button>
      </div>
    </div>
  )
}
