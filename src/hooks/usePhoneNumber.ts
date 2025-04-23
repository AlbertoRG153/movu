// src/hooks/usePhoneNumber.ts

import { useState } from "react"

// Expresión regular simple para validar números en formato internacional
const phoneRegex = /^\+504\s?\d{4}\s?\d{4}$/

/**
 * Hook personalizado para gestionar y validar el cambio de número de teléfono
 * @returns estados y funciones relacionados al número de teléfono
 */
export const usePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("+504******00")
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  /**
   * Función para validar y guardar el nuevo número de teléfono
   */
  const handleSave = (): boolean => {
    if (!phoneRegex.test(newPhoneNumber.trim())) {
      setError("El número debe tener el formato +504 0000 0000")
      return false
    }

    setPhoneNumber(newPhoneNumber)
    setError(null)
    return true
  }

  return {
    phoneNumber,
    newPhoneNumber,
    setNewPhoneNumber,
    handleSave,
    error,
  }
}
