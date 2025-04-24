'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/supabaseClient'
import { MapPin } from 'lucide-react'

interface VehicleType {
  id: string
  name: string
  load_capacity_kg: number
  volume: string
}

interface Vehicle { 
  id: string
  plate_number: string
  brand: string
  model: string
  color: string
  vehicle_img: string
  id_vehicle_type: string
}

export const ProfileCarrier = () => {
  const router = useRouter()

  const [cityName, setCityName] = useState('')
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [vehicleType, setVehicleType] = useState<VehicleType | null>(null)

  const userId = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("main_view") || "{}").userId
    : null

  const handleCityChange = () => {
    router.push('/customer/profile/cities')
  }

  const fetchUserData = async () => {
    if (!userId) return

    const { data, error } = await supabase
      .from('person')
      .select('id_city')
      .eq('id', userId)
      .single()

    if (!error && data?.id_city) {
      const { data: cityData, error: cityError } = await supabase
        .from('city')
        .select('name')
        .eq('id', data.id_city)
        .single()

      if (!cityError && cityData?.name) {
        setCityName(cityData.name)
      }
    }
  }

  const fetchVehicleData = async () => {
    if (!userId) return

    const { data: carrierData, error: carrierError } = await supabase
      .from('carrier')
      .select('id_vehicle')
      .eq('id_person', userId)

    if (carrierError || !carrierData || carrierData.length === 0) {
      console.warn("No se encontró información en carrier.")
      return
    }

    const { id_vehicle } = carrierData[0]

    const { data: vehicleData, error: vehicleError } = await supabase
      .from('vehicle')
      .select('*')
      .eq('id', id_vehicle)
      .single()

    if (vehicleError || !vehicleData) {
      console.error("Error al obtener datos del vehículo:", vehicleError)
      return
    }

    setVehicle(vehicleData)

    const { data: vehicleTypeData, error: vehicleTypeError } = await supabase
      .from('vehicle_type')
      .select('*')
      .eq('id', vehicleData.id_vehicle_type)
      .single()

    if (!vehicleTypeError && vehicleTypeData) {
      setVehicleType(vehicleTypeData)
    }
  }

  useEffect(() => {
    fetchUserData()
    fetchVehicleData()
  }, [])

  return (
    <div className="relative flex flex-col justify-start p-9 bg-[#092A39]/80 h-[90vh] w-full top-0 px-4">
      <div className="flex flex-col sm:flex-row w-full justify-center gap-6 px-3">

{/* Card fletero */}
<div className="bg-[#092A39]/95 w-full sm:w-[80%] rounded-2xl p-6 shadow-md flex flex-col items-center space-y-4">
  {/* Título centrado */}
  <h3 className="text-xl font-semibold text-white text-center">Información del Vehículo</h3>
    <div className="flex flex-col items-center space-y-4">
        {/* Imagen del vehículo */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white">
                <Image
                src={vehicle?.vehicle_img || "/images/placeholder-vehicle.jpg"}
                alt="Vehículo"
                layout="fill"
                objectFit="cover"
                />
            </div>
        {/* Datos del vehículo centrados */}
        <div className="text-white text-center">
            {vehicle ? (
            <>
                <p className="text-sm"><span className="font-bold">Placa:</span> {vehicle.plate_number}</p>
                <p className="text-sm"><span className="font-bold">Marca:</span> {vehicle.brand}</p>
                <p className="text-sm"><span className="font-bold">Modelo:</span> {vehicle.model}</p>
                <p className="text-sm"><span className="font-bold">Color:</span> {vehicle.color}</p>
                {vehicleType && (
                <>
                    <p className="text-sm"><span className="font-bold">Tipo:</span> {vehicleType.name}</p>
                    <p className="text-sm"><span className="font-bold">Capacidad de carga:</span> {vehicleType.load_capacity_kg} kg</p>
                    <p className="text-sm"><span className="font-bold">Volumen:</span> {vehicleType.volume}</p>
                </>
                )}
            </>
            ) : (
            <p className="text-sm italic text-white/60">No hay información de vehículo disponible.</p>
            )}
        </div>
    </div>
  </div>

        {/* Card ciudad */}
        <div
                onClick={handleCityChange}
                className="cursor-pointer relative flex items-center justify-around top-0 px-4 bg-[#092A39]/95 w-full sm:w-[80%] rounded-2xl p-6 shadow-md hover:bg-[#0a3c50]/90 transition-colors"
                >
                <div>
                    <h3 className="text-white text-x2 font-semibold mb-1">{cityName || '...'}</h3>
                    <p className="text-white/75 text-xs">Cambia de ciudad</p>
                </div>
                <div>
                    <MapPin size={20} color="#2DF1A9" />
                </div>
            </div>
        </div>
    </div>
  )
}