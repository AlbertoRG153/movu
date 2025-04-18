'use client'

import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/supabaseClient'

interface City {
  id: string
  name: string
}

export const CitiesCustomerCarrier = () => {
  const router = useRouter()
  const [cities, setCities] = useState<City[]>([])

  const userId = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("main_view") || "{}").userId
    : null

  const handleBack = () => {
    router.back()
  }

  const fetchCities = async () => {
    const { data, error } = await supabase
      .from('city')
      .select('id, name')

    if (error) {
      console.error('Error al cargar ciudades:', error)
    } else {
      setCities(data || [])
    }
  }

  const handleCitySelect = async (cityId: string) => {
    if (!userId) {
      console.error("No se encontró el ID del usuario")
      return
    }

    const { error } = await supabase
      .from('person')
      .update({ id_city: cityId })
      .eq('id', userId)

    if (error) {
      console.error('Error al actualizar ciudad:', error)
    } else {
      router.back() // vuelve a la página anterior
    }
  }

  useEffect(() => {
    fetchCities()
  }, [])

  return (
    <div className="relative flex flex-col bg-[#092A39] min-h-screen w-full">
      {/* Header */}
      <div className="relative flex items-center justify-center w-full h-[10vh] px-4">
        <button 
          onClick={handleBack} 
          className="absolute left-4 cursor-pointer transition-transform transform hover:scale-105"
        >
          <ArrowLeft size={20} color="white" />
        </button>
        <h3 className="text-white text-x2">Selecciona una ciudad</h3>
      </div>

      {/* Contenido */}
      <div className="h-[90vh] flex flex-col items-center overflow-y-auto w-full">
        <div className="w-full">
          {cities.map((city) => (
            <div
              key={city.id}
              onClick={() => handleCitySelect(city.id)}
              className="flex flex-col border-b border-white-600 px-10 pb-2 pt-3 cursor-pointer hover:bg-white/5 transition-all"
            >
              <h3 className="text-white text-base font-semibold">{city.name}</h3>
              <p className="text-white/75 text-xs">Honduras</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
