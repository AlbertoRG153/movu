"use client"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function IdiomaPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("es")

  const languages = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "pt", name: "Português" },
  ]

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code)
    // Aquí iría la lógica para cambiar el idioma
    console.log("Cambiando idioma a:", code)
    // Normalmente enviarías esto a una API o lo guardarías en localStorage
    setTimeout(() => {
      // Redirigir a la página de configuraciones
      window.location.href = "/configuraciones"
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#0a2a3a] text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center border-b border-[#1a3a4a]">
        <Link href="/configuraciones" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-medium">Idioma</h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        <div className="space-y-4">
          {languages.map((language) => (
            <button
              key={language.code}
              className="flex items-center justify-between w-full py-3 border-b border-[#1a3a4a]"
              onClick={() => handleLanguageSelect(language.code)}
            >
              <span>{language.name}</span>
              {selectedLanguage === language.code && <Check className="w-5 h-5 text-blue-500" />}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
