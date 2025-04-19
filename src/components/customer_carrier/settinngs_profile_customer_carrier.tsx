'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Alert, Snackbar, Dialog,  Button } from '@mui/material'
import { ArrowLeft, CircleUser, Pencil, UserRound, Mail, Building2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/supabaseClient'

interface UserData {
  firstName: string;
  secondName: string;
  firstSurname: string;
  secondSurname: string;
  email: string;
  idCity: string;
  profileImage: string;
}

export const SettingsProfileCustomerCarrierMode = () => {
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [firstSurname, setFirstSurname] = useState('')
  const [secondSurname, setSecondSurname] = useState('')
  const [email, setEmail] = useState('')
  const [cityName, setCityName] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [idCity, setIdCity] = useState('')
  const [loading, setLoading] = useState(false)

  const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [alertMessage, setAlertMessage] = useState('')

  const [originalData, setOriginalData] = useState<UserData | null>(null);  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleCloseAlert = () => setOpenAlert(false)
  const userId = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("main_view") || "{}").userId : null;

  // Función para obtener los datos del usuario desde la base de datos de Supabase
  const fetchUserData = async () => {
    if (!userId) return

    // Obtener los datos del usuario utilizando el ID de usuario
    const { data, error } = await supabase
      .from('person')
      .select('first_name, second_name, first_surname, second_surname, email, id_city, profile_img')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error al obtener los datos del usuario:', error)
      return
    }

    const {
      first_name,
      second_name,
      first_surname,
      second_surname,
      email,
      id_city,
      profile_img
    } = data

    const original = {
      firstName: first_name,
      secondName: second_name,
      firstSurname: first_surname,
      secondSurname: second_surname,
      email,
      idCity: id_city,
      profileImage: profile_img
    }

    setOriginalData(original)
    setFirstName(first_name || '')
    setSecondName(second_name || '')
    setFirstSurname(first_surname || '')
    setSecondSurname(second_surname || '')
    setEmail(email || '')
    setProfileImage(profile_img || '')
    setIdCity(id_city || '')

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

  const hasChanges = () => {
    if (!originalData) return false
    return (
      firstName !== originalData.firstName ||
      secondName !== originalData.secondName ||
      firstSurname !== originalData.firstSurname ||
      secondSurname !== originalData.secondSurname ||
      idCity !== originalData.idCity ||
      email !== originalData.email  // Añadido control de cambios en el email
    )
  }

  const handleBack = () => {
    if (hasChanges()) {
      setShowConfirmModal(true)
    } else {
      router.back()
    }
  }

  const handleCityChange = () => {
    router.push('/customer/profile/cities')
  }

  const handleUpdateProfile = async () => {
    if (!email) return

    setLoading(true)

    const { error } = await supabase
      .from('person')
      .update({
        first_name: firstName,
        second_name: secondName,
        first_surname: firstSurname,
        second_surname: secondSurname,
        id_city: idCity,
        profile_img: profileImage,
        email: email,  // Añadido email en la actualización
      })
      .eq('id', userId)  // Usamos el ID de usuario para actualizar los datos

    setLoading(false)

    if (error) {
      console.error('Error al actualizar perfil:', error)
      setAlertType('error')
      setAlertMessage('Hubo un error al guardar los cambios.')
    } else {
      setAlertType('success')
      setAlertMessage('Perfil actualizado correctamente.')
      await fetchUserData()
    }

    setOpenAlert(true)
  }


  
  const handleProfileImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !userId) return
  
    const filePath = `${userId}/${file.name}`
  
    try {
      // Eliminar imagen anterior si existe
      if (profileImage) {
        const prevPath = profileImage.split('/').slice(-2).join('/')
        await supabase.storage.from('profileimg').remove([prevPath])
      }
  
      // Subir la nueva imagen
      const { error: uploadError } = await supabase.storage
        .from('profileimg')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })
  
      if (uploadError) throw uploadError
  
      // Obtener la URL pública
      const { data: publicUrlData } = supabase.storage
        .from('profileimg')
        .getPublicUrl(filePath)
  
      const newUrl = publicUrlData.publicUrl
  
      // Actualizar en la base de datos
      const { error: updateError } = await supabase
        .from('person')
        .update({ profile_img: newUrl })
        .eq('id', userId)
  
      if (updateError) throw updateError
  
      setProfileImage(newUrl)
      setAlertType('success')
      setAlertMessage('Foto de perfil actualizada')
    } catch (error) {
      console.error('Error al actualizar imagen:', error)
      setAlertType('error')
      setAlertMessage('Hubo un error al subir la imagen.')
    } finally {
      setOpenAlert(true)
    }
  }
  
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
        <h3 className="text-white text-x2">Configuración de perfil</h3>
      </div>

      {/* Contenido */}
      <div className="h-[90vh] flex flex-col items-center pt-5">
        {/* Imagen */}
        <div className="relative w-[100px] h-[100px]">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Foto de perfil"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          ) : (
            <CircleUser size={100} color="white" />
          )}

          {/* Ícono de editar */}
          <div className="absolute bottom-0 right-0">
            <label htmlFor="profile-upload">
              <Pencil size={18} color="white" className="cursor-pointer hover:scale-105 transition-transform" />
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImageUpload}
            />
          </div>
        </div>


        {/* Inputs */}
        <div className="mt-10 w-8/11">
          {[{ val: firstName, set: setFirstName }, { val: secondName, set: setSecondName }, { val: firstSurname, set: setFirstSurname }, { val: secondSurname, set: setSecondSurname }].map((item, idx) => (
            <div key={idx} className="flex items-center mb-4 border-b border-white-600">
              <UserRound size={18} color="white" className="mr-3" />
              <input
                type="text"
                className="text-white text-16px outline-none bg-transparent w-full"
                value={item.val}
                onChange={(e) => item.set(e.target.value)}
              />
            </div>
          ))}
          {/* Campo de email */}
          <div className="flex items-center mb-4 border-b border-white-600">
            <Mail size={18} color="white" className="mr-3" />
            <input
              type="email"
              className="text-white text-16px outline-none bg-transparent w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Permite editar el email
            />
          </div>
          <div className="flex items-center mb-4 border-b border-white-600 cursor-pointer" onClick={handleCityChange}>
            <Building2 size={18} color="white" className="mr-3" />
            <h3 className="text-white text-16px">{cityName || ' '}</h3>
          </div>
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="bg-[#2DF1A9] text-[#092A39] px-12 py-3 rounded-2xl shadow-lg hover:bg-[#0A3D50] transition-colors duration-300"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Modal confirmación de salida */}
      <Dialog open={showConfirmModal} >
        <div className=" p-4">
          <h2 className="text-[#092A39] font-semibold text-xl mb-4 text-center">¿Deseas salir sin guardar?</h2>
          <div className="flex items-center justify-center">
              <p className="text-[#092A39] font-normal pl-1 pr-1  pb-2 text-justify text-sm">
                Tienes cambios sin guardar. ¿Estás seguro de que deseas salir sin guardar?
              </p>
          </div>
          <div className="flex justify-end p-2 space-x-2">
              <Button
                onClick={() => setShowConfirmModal(false)}
                sx={{
                  fontSize: '0.75rem', 
                  color: '#0A3D50',     
                  textTransform: 'none', 

                }}
              >
                Continuar editando
              </Button>

              <Button
                onClick={() => {
                  setShowConfirmModal(false)
                  router.back()
                }}
                sx={{
                  fontSize: '0.75rem',
                  color: '#B00020',
                  textTransform: 'none'
                }}
              >
                Salir sin guardar
              </Button>
            </div>
          </div>
      </Dialog>
    </div>
  )
}
