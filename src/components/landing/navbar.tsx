"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"

// Componente para el logo de Movu
const Logo = () => (
  <div className="flex items-center">
    <Image
      src="/Logo_movu.png"
      alt="Logo"
      width={60}
      height={60}
      priority
    />
  </div>
)

// Enlaces de navegación
const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Ciudades", href: "#ciudades" },
  { name: "Servicios", href: "#servicios" },
  { name: "Acerca de nosotros", href: "#acerca" },
  { name: "Contactanos", href: "#contacto" }
]

export function NavBar() {
  // Estado para controlar el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Estado para la sección activa
  const [activeSection, setActiveSection] = useState("/")
  // Estado para controlar la opacidad del navbar
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Efecto para detectar el desplazamiento y cambiar la opacidad
  useEffect(() => {
    const handleScrollOpacity = () => {
      // Cambiar el estado cuando el scroll es mayor a 20px
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScrollOpacity);
    return () => window.removeEventListener("scroll", handleScrollOpacity);
  }, []);
  
  // Efecto para detectar la sección activa basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .map(link => link.href.replace('#', ''))
        .filter(id => id !== "/");
      
      // Si estamos en la página inicial
      if (window.scrollY < 100) {
        setActiveSection("/");
        return;
      }
      
      // Revisamos cada sección desde la última a la primera (para priorizar las secciones inferiores)
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section === "/") continue;
        
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Ajustamos la condición para que detecte mejor las secciones inferiores
          if (rect.top <= 200) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };
    
    // Detectar la ruta actual al cargar
    const path = window.location.pathname;
    const hash = window.location.hash;
    setActiveSection(hash || path || "/");
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Manejador para clics en enlaces
  const handleLinkClick = (href, e, isDesktopNav = false) => {
    // Si es un enlace con ancla (#), prevenir la navegación por defecto
    if (href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Para versión escritorio, saltar directamente a la sección sin animación
        if (isDesktopNav) {
          // Calcular la posición del elemento
          const rect = targetElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop;
          
          // Saltar directamente a la posición
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto' // 'auto' en lugar de 'smooth' para ir directo
          });
        } else {
          // Para móvil mantener el scroll suave
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Actualizar la sección activa sin cambiar la URL
        setActiveSection(href);
      }
    } else {
      // Para enlaces normales (como "/"), permitir el comportamiento por defecto
      setActiveSection(href);
    }
    
    // Cerrar el menú móvil
    setIsMenuOpen(false);
  };
  
  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuContainer = document.getElementById("mobile-menu-container");
      const menuButton = document.getElementById("mobile-menu-button");
      
      if (isMenuOpen && 
          menuContainer && 
          !menuContainer.contains(event.target) && 
          menuButton && 
          !menuButton.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header 
      className={`sticky top-0 z-50 shadow-md transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-sm" 
          : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-10 group" 
            onClick={(e) => handleLinkClick("/", e)}
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Logo />
            </div>
          </Link>
          
          {/* Navegación para escritorio */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleLinkClick(link.href, e, true)} // true indica que es desktop
                  className={`px-3 py-2 rounded-lg transition-all duration-200 relative ${
                    activeSection === link.href 
                      ? "text-emerald-600 font-medium" 
                      : "text-gray-700 hover:text-emerald-500"
                  }`}
                >
                  {link.name}
                  {activeSection === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Botón de descarga */}
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg ml-2 flex items-center gap-2 shadow-sm transition-all duration-200 hover:shadow-md">
              <Download size={18} />
              Descargar la app
            </Button>
          </nav>
          
          {/* Contenedor del botón y menú móvil */}
          <div className="md:hidden relative">
            {/* Botón de menú móvil - MODIFICADO PARA AGRANDAR */}
            <button
              id="mobile-menu-button"
              className={`relative z-10 p-2 rounded-lg transition-all duration-200 text-gray-700 
                ${isMenuOpen 
                  ? "border-2 border-emerald-500" 
                  : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            {/* Menú móvil flotante */}
            {isMenuOpen && (
              <div 
                id="mobile-menu-container"
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in-down"
              >
                <nav className="py-2">
                  <ul className="flex flex-col">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className={`block py-3 px-4 transition-all duration-200 ${
                            activeSection === link.href
                              ? "bg-emerald-50 text-emerald-600 font-medium border-l-4 border-emerald-500"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                          onClick={(e) => handleLinkClick(link.href, e, false)} // false indica que es móvil
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                    <li className="px-4 py-2">
                      <Button
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2 flex items-center justify-center gap-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Download size={16} />
                        Descargar la app
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Estilos inline para la animación */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  )
}