"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function IdiomaPage() {
  // 1. Estado local que inicia con lo que haya en localStorage
  const [idioma, setIdioma] = useState("es")
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  // 2. Cargar idioma guardado si existe
  useEffect(() => {
    const idiomaGuardado = localStorage.getItem("idioma")
    if (idiomaGuardado) {
      setIdioma(idiomaGuardado)
    }
  }, [])

  // 3. Al cambiar el idioma lo guardamos en localStorage
  const handleIdiomaChange = (id: string) => {
    setIdioma(id)
    localStorage.setItem("idioma", id) // lo guardamos permanentemente
  }

  // 4. Función para confirmar y redirigir
  {/*
  const confirmarIdioma = () => {
    router.push("/ConfiguracionesPage")
  }
  */}

  return (
    <div className="min-h-screen bg-[#0a1929] text-white">
      <div className="container mx-auto max-w-md px-4 py-6">

        {/* Encabezado */}
        <div className="mb-6 flex items-center">

            <ArrowLeft className="h-5 w-5 mr-3" onClick={handleBack}/>

          <h1 className="text-xl font-medium">Seleccionar idioma</h1>
        </div>

        {/* Formulario de selección */}
        <form className="space-y-4">
          {[
            { id: "es", label: "Español (predeterminado)" },

          ].map(({ id, label }) => (
            <div key={id} className="flex items-center justify-between border-b border-gray-700 pb-4">
              <label
                htmlFor={id}
                className="flex items-center gap-2 text-base font-normal cursor-pointer"
              >
                {label}
              </label>
              <input
                type="radio"
                id={id}
                name="idioma"
                value={id}
                checked={idioma === id}
                onChange={() => handleIdiomaChange(id)}
                className="h-5 w-5 appearance-none rounded-full border border-white checked:bg-[#2DF1A9] checked:border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </form>

{/*
        <div className="mt-6 space-y-4">

          <button
            onClick={confirmarIdioma}
            className="w-full bg-[#138954] text-white py-3 px-4 rounded-lg flex items-center justify-center"
          >
            Confirmar Idioma
          </button>
             
       
        </div>
        */} 
      </div>
    </div>
  )
}
