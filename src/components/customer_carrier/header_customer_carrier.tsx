'use client'

import React from 'react'
import { CircleUser, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useEffect, useState } from 'react'
import Image from "next/image"


export const HeaderCustomerCarrier = () => {
  const [userInfo, setUserInfo] = useState<{ first_name: string, first_surname: string } | null>(null)
  const router = useRouter()
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)

  const handleBack = () => {
    router.back()
  }

  const handleGoToSettings = () => {
    router.push('/customer/profile/settings')
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
  

  return (
    <div className="relative flex items-center justify-between bg-[#092A39] w-full h-[10vh] top-0 px-4 transition-all duration-300 ease-in-out">
      
      {/* Flecha con funcionalidad de regreso */}
      <div className="flex items-center">
        <button 
          onClick={handleBack} 
          className="cursor-pointer transition-transform transform hover:scale-105"
        >
          <ArrowLeft size={20} color="white" />
        </button>
      </div>

      {/* Usuario */}
      <div className="flex-1 text-center">
        <h3 className="text-white text-x2">{userInfo ? `${userInfo.first_name} ${userInfo.first_surname}` : "..."}</h3>
      </div>

      {/* Icono de usuario */}
      
      <div className="w-8 h-8 rounded-full bg-[#1a3b45] flex items-center justify-center overflow-hidden">        <button 
          onClick={handleGoToSettings} 
          className="cursor-pointer transition-transform transform hover:scale-105"
        >
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
        </button>
      </div>
    </div>
  )
}
