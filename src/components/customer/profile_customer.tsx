'use client'

import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { ChevronRight, MapPin } from 'lucide-react'
import { supabase } from '@/lib/supabase/supabaseClient'



export const ProfileCustomer = () => {
  const router = useRouter()

  const [cityName, setCityName] = useState('')

  const userId = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("main_view") || "{}").userId
    : null

  const handleCityChange = () => {
    router.push('/customer/profile/cities')
  }
  
  localStorage.setItem('redirect_back_to', window.location.pathname)

  const handleDriverRegister = () => {
    router.push('/carrier_register/information')
  }

  const fetchUserData = async () => {
    if (!userId) return

    // 1. Obtener el id_city del usuario desde la tabla person
    const { data, error } = await supabase
      .from('person')
      .select('id_city')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error al obtener los datos del usuario:', error)
      return
    }

    const { id_city } = data

    // 2. Obtener el nombre de la ciudad desde la tabla city
    if (id_city) {
      const { data: cityData, error: cityError } = await supabase
        .from('city')
        .select('name')
        .eq('id', id_city)
        .single()

      if (!cityError && cityData?.name) {
        setCityName(cityData.name)
      } else {
        console.error('Error al obtener la ciudad:', cityError)
      }
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div className="relative flex flex-col justify-start p-9 bg-[#092A39]/80 h-[90vh] w-full top-0 px-4">
      <div className="flex flex-col sm:flex-row w-full justify-center gap-6 px-3">
        
        {/* Card fletero */}
        <div className="bg-[#092A39]/95 w-full sm:w-[80%] rounded-2xl p-6 shadow-md">
          <h3 className="text-white text-x2 font-semibold mb-1">¿Te gustaría obtener ganancias con nosotros?</h3>
          <p className="text-white/75 text-xs mb-4">Elige una forma y regístrate.</p>
          <div className="relative flex items-center justify-between w-full top-0 px-4" onClick={handleDriverRegister}>
            <div>
              <Image
                src="/camion.png"
                alt="Flete"
                width={40}
                height={40}
              />
            </div>
            <div>
              <h3 className="text-white text-x2 font-semibold">Fletes</h3>
              <p className="text-white/75 text-xs">Negocia tus tarifas</p>
            </div>
            <div className="flex items-center">
              <ChevronRight size={20} color="white" />
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
