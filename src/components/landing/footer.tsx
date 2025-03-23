import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  // Enlaces del footer
  const footerLinks = [
    { name: "Contacto", href: "#contacto" },
    { name: "Términos y Condiciones", href: "#terminos" },
    { name: "Política de Privacidad", href: "#privacidad" },
  ]

  // Redes sociales
  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "#facebook" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "#twitter" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#instagram" },
  ]

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Redes sociales */}
          <div className="mb-4 text-center">
            <p className="text-gray-500 mb-2">Síguenos en:</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-600 hover:text-emerald-500"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          {/* Enlaces del footer */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
            {footerLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-sm text-gray-600 hover:text-emerald-500">
                {link.name}
              </Link>
            ))}
          </div>
          {/* Copyright */}
          <p className="text-sm text-gray-950">
            &copy; {new Date().getFullYear()} Movu. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

