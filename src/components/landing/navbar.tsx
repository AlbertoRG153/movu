"use client"

import React, { useState } from "react"
import Link from "next/link"
import  Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

// Componente para el logo de Movu
const Logo = () => (
  <div  className="flex justify-center">
                      <Image 
                      src="/image.svg"
                      alt="Logo"
                      width={60}
                      height={60}
                      layout="fixed"
                      />
                      </div>
  
)

// Enlaces de navegación
const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Ciudades", href: "#ciudades" },
  { name: "Servicios", href: "#servicios" },
  { name: "Acerca de nosotros", href: "#acerca" },
]

export function NavBar() {
  // Estado para controlar el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="">
            <Logo />
          </Link>

          {/* Navegación para escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-700 hover:text-emerald-500 font-medium">
                {link.name}
              </Link>
            ))}

            {/* Botón de Iniciar Sesion*/} 
            <Link href="/login">
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-950">
               Iniciar Sesion</Button>
            </Link>
            
          </nav>
          {/* Botón de menú móvil */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t">
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block text-gray-700 hover:text-emerald-500 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Descargar la app
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

