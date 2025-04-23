"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import TripRequestCard from "./trip_request_card";
import TripRequestModal from "./trip_request_modal";
import { useRouter } from "next/navigation";
import { Alert, Snackbar } from "@mui/material";

interface TripRequest {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    origin: string;
    destination: string;
    origin_place: string;
    destination_place: string;
    description: string;
    date: string;
    service_type: string;
  }
export default function TripRequestList() {
    const [requests, setRequests] = useState<TripRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [carrierId, setCarrierId] = useState<string | null>(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [openAlert, setOpenAlert] = useState(false);
    const handleCloseAlert = () => {
    setOpenAlert(false);};


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<TripRequest | null>(
        null
    );
    const parseCoords = (str: string): [number, number] => {
        const [lat, lng] = str.split(",").map(Number);
        return [lat, lng];
      };
      useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("currentUser");
            if (userData) {
                const parsedData = JSON.parse(userData);
                setCarrierId(parsedData?.id || null);
            }
        }
    }, []);
    // Cargar las solicitudes de Supabase
    useEffect(() => {
        const fetchTripRequests = async () => {
            try {
                setLoading(true);
                
                // Verificar que la conexión a Supabase esté funcionando
                if (!supabase) {
                    throw new Error("La conexión a Supabase no está disponible");
                }
                
                const { data: tripData, error: tripError } = await supabase
  .from('travel_request')
  .select(`
    *,
    person (
      first_name,
      first_surname
    )
  `)
  .order('date', { ascending: false });
               
                if (tripError) {
                    console.error("Error de Supabase:", tripError);
                    throw new Error(tripError.message);
                }

            
                if (tripData) {
                    console.log("Datos recibidos:", tripData);
                    
                    // Transformar los datos al formato que espera el componente
                    const formattedRequests = tripData.map(trip => {
                        return {
                          id: trip.id,
                          name: trip.person ? `${trip.person.first_name} ${trip.person.first_surname}` : "Usuario",
                          price: trip.price || 0,
                          rating: 0,
                          reviews: 0,
                          origin: trip.origin_place,
                          destination: trip.destination_place,
                          origin_place: trip.origin_place,
                          destination_place: trip.destination_place,
                          description: trip.description || "Sin descripcion",
                          date: trip.date,
                          service_type: trip.id_service_type === "7dcdd948-75bc-46b5-bcec-6e47e827b24b" ? "Flete" : "Mudanza"
                        };
                      });
                    
                    setRequests(formattedRequests);
                } else {
                    setRequests([]);
                }
            } catch (err) {
                console.error("Error fetching trip requests:", err);
                setError("No se pudieron cargar las solicitudes: " + (err instanceof Error ? err.message : String(err)));
            } finally {
                setLoading(false);
            }
        };

        fetchTripRequests();
        
        // Suscribirse a cambios en la tabla travel_request
        const subscription = supabase
            .channel('table-changes')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'travel_request' }, 
                (payload) => {
                    console.log("Cambio detectado:", payload);
                    // Recargar los datos cuando haya cambios
                    fetchTripRequests();
                }
            )
            .subscribe();
            
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleAccept = async (id: string) => {
        try {
            // Aquí podrías actualizar el estado de la solicitud en Supabase
            const { error } = await supabase
                .from("travel_request")
                .update({ status: "accepted" })
                .eq("id", id);
                
            if (error) throw error;
                
            // Actualizar la lista local de solicitudes
        setRequests(requests.filter((request) => request.id !== id));
        } catch (err) {
            console.error("Error accepting request:", err);
            alert("No se pudo aceptar la solicitud");
        }
    };

    const handleReject = async (id: string) => {
        try {
            // Cambiar estado a "rejected" en Supabase
            const { error } = await supabase
                .from("travel_request")
                .update({ status: "rejected" })
                .eq("id", id);
                
            if (error) throw error;
                
            // Actualizar la lista local
        setRequests(requests.filter((request) => request.id !== id));
        } catch (err) {
            console.error("Error rejecting request:", err);
            alert("No se pudo rechazar la solicitud");
        }
    };

    const handleCancel = () => {
        if (typeof window !== "undefined") {
            router.push("/carrier/main_view");
        }
    };
    
    const handleViewDetails = (request: TripRequest) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleSubmitOffer = async (newPrice: number) => {
        if (selectedRequest) {
            try {
                const finalPrice = newPrice || selectedRequest.price;    
                const { error: insertError } = await supabase
                    .from("trip_request")
                    .insert({
                        acepto: false,
                        id_travel_request: selectedRequest.id,
                        id_carrier: carrierId,
                        newPrice: finalPrice,
                    });
    
                if (insertError) throw insertError;
                setAlertMessage("Oferta enviada con éxito");
                setAlertType("success");
                setOpenAlert(true);
                // Opcional: remover la solicitud aceptada del estado
                setRequests(requests.filter((req) => req.id !== selectedRequest.id));
                setIsModalOpen(false);
            } catch (err) {
                console.error("Error al enviar la oferta:", err);
                setAlertMessage("No se pudo enviar la oferta");
                setAlertType("error");
                setOpenAlert(true);
            }
        }
    };

    // Para propósitos de depuración
    useEffect(() => {
        console.log("Supabase client:", supabase ? "Disponible" : "No disponible");
    }, []);

    return (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
            <header className="flex items-center justify-center p-4 bg-white">
                <h1 className="text-center text-lg font-medium text-gray-800">
                    Solicitudes de Viaje
                </h1>
                <div className="w-8"></div> {/* Spacer for alignment */}
            </header>

            <div className="flex-1 p-4 overflow-auto space-y-4">
                {loading ? (
                    <div className="text-center py-8">Cargando solicitudes...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">
                        <p>{error}</p>
                        <button
                        onClick={() => {
                         if (typeof window !== "undefined") {
                          router.refresh();
                         }
                          }}
                           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" >
                              Reintentar
                            </button>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="text-center py-8">No hay solicitudes disponibles</div>
                ) : (
                    requests.map((request) => (
                    <TripRequestCard
                        key={request.id}
                        request={request}
                        onAccept={() => handleAccept(request.id)}
                        onReject={() => handleReject(request.id)}
                        onViewDetails={() => handleViewDetails(request)}
                    />
                    ))
                )}
            </div>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleCancel}
                    className="w-full py-3 bg-red-500 text-white rounded-md font-medium"
                >
                    Regresar
                </button>
            </div>
            {selectedRequest && (
                <TripRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmitOffer}
                    tripDetails={{
                        origin: selectedRequest.origin_place,
                        destination: selectedRequest.destination_place,
                        description: selectedRequest.description,
                        currentOffer: selectedRequest.price,
                        pickupCoords: parseCoords(selectedRequest.origin_place),
                        destinationCoords: parseCoords(selectedRequest.destination_place),
                      }}
                />
            )}
            <Snackbar
                         open={openAlert}
                         autoHideDuration={6000}
                         onClose={handleCloseAlert}
                         anchorOrigin={{ vertical: "top", horizontal: "center" }}
                          ><Alert
                              onClose={handleCloseAlert}
                              severity={alertType}
                              sx={{ width: "100%" }}
                              >
                             {alertMessage}
                         </Alert>
                        </Snackbar>
        </div>
    );
}
