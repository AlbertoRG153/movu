"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/supabaseClient"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, Snackbar } from "@mui/material"
import { useRouter } from "next/navigation"
import React from "react"

export default function ChangePhoneNumberPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [error, setError] = useState("")

  const [openAlert, setOpenAlert] = useState(false)
  const [alertType, setAlertType] = useState<'success' | 'error'>('success')
  const [alertMessage, setAlertMessage] = useState('')

  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  const userId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("main_view") || "{}").userId
      : null

  const fetchPhone = async () => {
    if (!userId) return

    const { data, error } = await supabase
      .from("person")
      .select("phone")
      .eq("id", userId)
      .single()

    if (error) {
      console.error("Error al obtener el número:", error.message)
      return
    }

    setPhoneNumber(data?.phone || "")
    setNewPhoneNumber("")
    setError("")
  }

  useEffect(() => {
    fetchPhone()
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!newPhoneNumber) {
      setError("El número no puede estar vacío.")
      return
    }
  
    if (!userId) {
      setError("Usuario no encontrado.")
      return
    }
  
    // Validar si ya existe el número
    const { data: existingPhone, error: checkError } = await supabase
      .from("person")
      .select("id")
      .eq("phone", newPhoneNumber)
      .neq("id", userId) // excluir al usuario actual
      .single()
  
    if (checkError && checkError.code !== "PGRST116") {
      // error real (no simplemente "no hay datos")
      console.error("Error validando número:", checkError.message)
      setAlertType("error")
      setAlertMessage("Error validando el número.")
      setOpenAlert(true)
      return
    }
  
    if (existingPhone) {
      setAlertType("error")
      setAlertMessage("Este número ya está registrado.")
      setOpenAlert(true)
      return
    }
  
    // Si pasa la validación, actualizar
    const { error: updateError } = await supabase
      .from("person")
      .update({ phone: newPhoneNumber })
      .eq("id", userId)
  
    if (updateError) {
      console.error("Error actualizando número:", updateError.message)
      setAlertType("error")
      setAlertMessage("No se pudo actualizar el número.")
      setOpenAlert(true)
      return
    }
  
    await fetchPhone()
  
    setAlertType("success")
    setAlertMessage("Número actualizado correctamente.")
    setOpenAlert(true)
  }
  

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return
    setOpenAlert(false)
  }

  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col">
      <header className="p-4 flex items-center border-b border-[#1a3a4a]">
        <ArrowLeft className="w-5 h-5 mr-3 cursor-pointer" onClick={handleBack} />
        <h1 className="text-lg font-medium">Cambiar número de teléfono</h1>
      </header>

      <main className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Número actual</p>
            <p>{phoneNumber || "..."}</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="newPhone" className="text-sm text-gray-400">
              Nuevo número de teléfono
            </label>
            <Input
              id="newPhone"
              type="tel"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              placeholder="+504 0000 0000"
              className="bg-[#1a3a4a] border-[#1a3a4a] text-white"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
          <div className="flex justify-center  ">
            <div className="w-5/10 mt-2">
              <Button type="submit" className="w-full bg-[#2DF1A9] p-5 rounded-full text-black  ">
                Guardar cambios
              </Button>
            </div>
          </div>
          
        </form>
      </main>

      {/* Snackbar */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
