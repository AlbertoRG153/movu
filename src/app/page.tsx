import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoveIcon as MovingTruck, Truck, TruckIcon } from "lucide-react"
import { NavBar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { ServiceCard } from "@/components/landing/service_card"

export default function Home() {
  // Definimos los servicios que ofrece Movu la Landing definida en PAGE 
  const services = [
    {
      title: "Mudanza",
      icon: <MovingTruck className="h-16 w-16 text-emerald-400" />,
      description: "Servicio de mudanza para hogares y oficinas",
    },
    {
      title: "Fletes",
      icon: <Truck className="h-16 w-16 text-emerald-400" />,
      description: "Transporte de mercancías y paquetería",
    },
    {
      title: "Material de construcción",
      icon: <TruckIcon className="h-16 w-16 text-emerald-400" />,
      description: "Entrega de materiales para construcción",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Barra de navegación */}
      <NavBar />
      {/* Sección Hero */}
      <section className="relative h-[500px]">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="./fondo.svg"
            alt="Repartidores de Movu"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        {/* Contenido superpuesto */}
        <div className="relative z-10 flex h-full flex-col items-center 
        justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
            <span className="text-white">movu</span>, donde cada carga
            <span className="block">tiene su destino</span>
          </h1>
        </div>
      </section>
      {/* Sección Sobre Nosotros */}
      <div className="relative z-10 flex h-full flex-col items-center">
      <Button variant="outline" className="mt-8  font-bold text-2xl
          bg-emerald-950 text-emerald-400 hover:bg-emerald-400 
              border-none w-90 h-15 rounded-full absolute -top-9 -left-4 ">
            Sobre nosotros
          </Button>
          </div>
      <section className="py-16 px-5 md:px-8 max-w-6xl mx-auto text-center">
        <p className="text-lg text-gray-700 max-w-4xl mx-auto font-normal">
          En Movu, revolucionamos el transporte de fletes, mudanzas y materiales con una plataforma flexible y
          transparente. Conectamos a clientes con transportistas de confianza, permitiéndote elegir la mejor opción
          según precio, disponibilidad y ubicación. Cuidado de principio a fin y las actualizaciones necesarias para que
          tu carga llegue segura y a tiempo.
        </p>

        {/* Botones de descarga */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
          <Link href="#" className="inline-block">
            <Image
              src="/googleplay.svg"
              alt="Google Play"
              width={170}
              height={50}
              className="h-auto"
            />
          </Link>
          <Link href="#" className="inline-block">
            <Image
              src="/appstore.svg"
              alt="App Store"
              width={170}
              height={50}
              className="h-auto"
            />
          </Link>
        </div>
      </section>

      {/* Sección Nuestros Servicios */}
      <section className="py-16 px-4 bg-[#0a2540] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} title={service.title} icon={service.icon} description={service.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

