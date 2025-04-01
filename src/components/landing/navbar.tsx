"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

// Definir tipos para enlaces de navegación
interface NavLink {
    name: string;
    href: string;
}

// Componente de Logo con TypeScript
const Logo: React.FC = () => (
    <div className="flex items-center">
        <Image
            src="/Logo_movu.png"
            alt="Logo"
            width={60}
            height={60}
            priority
        />
    </div>
);

// Enlaces de navegación
const navLinks: NavLink[] = [
    { name: "Inicio", href: "/" },
    { name: "Ciudades", href: "#ciudades" },
    { name: "Servicios", href: "#servicios" },
    { name: "Acerca de nosotros", href: "#acerca" },
    { name: "Contactanos", href: "#contacto" },
];

export function NavBar() {
    // Estados con tipado explícito
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>("/");
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    // Efecto de opacidad al desplazarse
    useEffect(() => {
        const handleScrollOpacity = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScrollOpacity);
        return () => window.removeEventListener("scroll", handleScrollOpacity);
    }, []);

    // Efecto de detección de sección activa
    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks
                .map((link) => link.href.replace("#", ""))
                .filter((id) => id !== "/");

            // Verificación de página inicial
            if (window.scrollY < 100) {
                setActiveSection("/");
                return;
            }

            // Detección de sección
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section === "/") continue;

                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveSection(`#${section}`);
                        break;
                    }
                }
            }
        };

        // Detectar ruta actual al cargar
        const path = window.location.pathname;
        const hash = window.location.hash;
        setActiveSection(hash || path || "/");

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Función de desplazamiento suave
    const smoothScrollToSection = (targetElement: HTMLElement) => {
        // Agregar desplazamiento para compensar el encabezado fijo
        const headerOffset = 80; // Ajustar este valor según la altura del encabezado
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    };

    // Controlador de clics en enlaces con tipo de evento explícito
    const handleLinkClick = (
        href: string,
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        // Manejo de sección de inicio (logo o enlace de "Inicio")
        if (href === "/" || href === "") {
            e.preventDefault();

            // Desplazamiento suave a la parte superior de la página
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

            setIsMenuOpen(false);
            return;
        }

        // Manejo de enlaces de anclaje
        if (href.startsWith("#")) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Usar desplazamiento suave consistente para escritorio y móvil
                smoothScrollToSection(targetElement);
            }
        }

        setIsMenuOpen(false);
    };

    // Controlador de clics fuera del menú móvil
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const menuContainer = document.getElementById(
                "mobile-menu-container"
            );
            const menuButton = document.getElementById("mobile-menu-button");

            if (
                isMenuOpen &&
                menuContainer &&
                !menuContainer.contains(event.target as Node) &&
                menuButton &&
                !menuButton.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    return (
        <header
            className={`sticky top-0 z-50 shadow-md transition-all duration-300 ${
                isScrolled ? "bg-white/90 backdrop-blur-sm" : "bg-white"
            }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="">
                        <Logo />
                    </Link>

                    {/* Navegación para escritorio */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-emerald-500 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Botón de Iniciar Sesion*/}
                        <Link href="/login">
                            <Button className="bg-emerald-400 hover:bg-emerald-500 text-950">
                                Iniciar Sesion
                            </Button>
                        </Link>
                    </nav>
                    {/* Botón de menú móvil */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        <div className="transition-transform duration-300 group-hover:scale-105">
                            <Logo />
                        </div>
                    </button>

                    {/* Navegación de escritorio */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) =>
                                        handleLinkClick(link.href, e)
                                    }
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

                    {/* Contenedor de menú móvil */}
                    <div className="md:hidden relative">
                        <button
                            id="mobile-menu-button"
                            className={`relative z-10 p-2 rounded-lg transition-all duration-200 text-gray-700 
                ${isMenuOpen ? "border-2 border-emerald-500" : ""}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={
                                isMenuOpen ? "Cerrar menú" : "Abrir menú"
                            }
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>

                        {/* Menú móvil */}
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
                                                        activeSection ===
                                                        link.href
                                                            ? "bg-emerald-50 text-emerald-600 font-medium border-l-4 border-emerald-500"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                    }`}
                                                    onClick={(e) =>
                                                        handleLinkClick(
                                                            link.href,
                                                            e
                                                        )
                                                    }
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                        <li className="px-4 py-2">
                                            <Button
                                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg py-2 flex items-center justify-center gap-2"
                                                onClick={() =>
                                                    setIsMenuOpen(false)
                                                }
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

            {/* Estilos en línea para animación */}
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
    );
}
