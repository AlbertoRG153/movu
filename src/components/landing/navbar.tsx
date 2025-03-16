"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

// Componente para el logo de Movu
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="relative">
      <div className="absolute -left-6 top-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-1">
          <div className="h-0.5 w-4 bg-emerald-400"></div>
          <div className="h-0.5 w-3 bg-emerald-400"></div>
          <div className="h-0.5 w-2 bg-emerald-400"></div>
        </div>
      </div>
      <div className="h-8 w-8 text-emerald-400">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 16.0002V7.9992C20.9996 7.64739 20.9071 7.30247 20.7315 7.00189C20.556 6.70132 20.3037 6.45642 20 6.2932L12.9 2.2932C12.6364 2.14468 12.3394 2.06641 12.037 2.06641C11.7346 2.06641 11.4376 2.14468 11.174 2.2932L4.074 6.2932C3.77032 6.45642 3.51798 6.70132 3.34242 7.00189C3.16687 7.30247 3.07435 7.64739 3.074 7.9992V16.0002C3.07435 16.352 3.16687 16.6969 3.34242 16.9975C3.51798 17.2981 3.77032 17.543 4.074 17.7062L11.174 21.7062C11.4376 21.8547 11.7346 21.933 12.037 21.933C12.3394 21.933 12.6364 21.8547 12.9 21.7062L20 17.7062C20.3037 17.543 20.556 17.2981 20.7315 16.9975C20.9071 16.6969 20.9996 16.352 21 16.0002Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.27002 6.96094L12 12.0109L20.73 6.96094"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
    <span className="text-2xl font-bold text-[#0a2540]">movu</span>
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
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Navegación para escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-700 hover:text-emerald-500 font-medium">
                {link.name}
              </Link>
            ))}

            {/* Botón de descarga */}
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">Descargar la app</Button>
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

