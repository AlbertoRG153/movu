"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    MoveIcon as MovingTruck,
    Truck,
    TruckIcon,
    MapPinIcon,
    InfoIcon,
    PhoneIcon,
} from "lucide-react";
import { NavBar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Componente de tarjeta de servicio modernizado con animaciones
type ServiceCardProps = {
    title: string;
    icon: React.ReactNode;
    description: string;
};
const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    icon,
    description,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 rounded-xl shadow-lg transition-all cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 200, 150, 0.2)",
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.div
                className="flex justify-center mb-4"
                animate={{
                    y: isHovered ? [0, -5, 0] : 0,
                }}
                transition={{
                    duration: 1,
                    repeat: isHovered ? Infinity : 0,
                    repeatType: "loop",
                }}
            >
                {icon}
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-emerald-300">{title}</h3>
            <p className="text-emerald-100/80">{description}</p>
        </motion.div>
    );
};

// Componente de tarjeta de ciudad disponible
type CityCardProps = {
    city: string;
    image: string;
};

const CityCard: React.FC<CityCardProps> = ({ city, image }) => {
    return (
        <motion.div
            className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="relative h-40">
                <Image
                    src={image}
                    alt={`Movu en ${city}`}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-emerald-400" />
                            <h3 className="text-xl font-bold">{city}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function Home() {
    // Referencias para la navegación por secciones
    const heroRef = useRef<HTMLDivElement | null>(null);
    const serviciosRef = useRef<HTMLDivElement | null>(null);
    const ciudadesRef = useRef<HTMLDivElement | null>(null);
    const acercaRef = useRef<HTMLDivElement | null>(null);
    const contactoRef = useRef<HTMLDivElement | null>(null);

    // Efecto para actualizar los enlaces de navegación
    useEffect(() => {
        // Función para actualizar los enlaces href del NavBar
        const updateNavLinks = () => {
            const navLinks =
                document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
            navLinks.forEach((link) => {
                link.addEventListener("click", (e: MouseEvent) => {
                    e.preventDefault();
                    const href = link.getAttribute("href");
                    if (!href) return;

                    const targetId = href.substring(1);

                    // Objeto que mapea los IDs de los enlaces a las referencias
                    const targetRef = {
                        ciudades: ciudadesRef,
                        servicios: serviciosRef,
                        acerca: acercaRef,
                        contacto: contactoRef,
                    }[targetId];

                    // Si existe la referencia, desplazarse hasta el objetivo
                    if (targetRef && targetRef.current) {
                        targetRef.current.scrollIntoView({
                            behavior: "smooth",
                        });
                    }
                });
            });
        };

        // Ejecutar después de que el componente se monte
        updateNavLinks();
    }, []);

    // Definimos los servicios que ofrece Movu
    const services = [
        {
            title: "Mudanza",
            icon: <MovingTruck className="h-16 w-16 text-emerald-400" />,
            description:
                "Servicio de mudanza para hogares y oficinas con personal altamente calificado y equipos modernos.",
        },
        {
            title: "Fletes",
            icon: <Truck className="h-16 w-16 text-emerald-400" />,
            description:
                "Transporte de mercancías y paquetería con seguimiento en tiempo real y garantía de seguridad.",
        },
        {
            title: "Material de construcción",
            icon: <TruckIcon className="h-16 w-16 text-emerald-400" />,
            description:
                "Entrega puntual de materiales para construcción adaptada a tus necesidades específicas.",
        },
    ];

    // Ciudades disponibles
    const cities = [
        {
            name: "Tegucigalpa",
            image: "/tegucigalpa.jpg",
        },
        {
            name: "San Pedro Sula",
            image: "/san_pedro_sula.jpg",
        },
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <main className="flex min-h-screen flex-col bg-gradient-to-b from-white to-emerald-50">
            {/* Usar el componente NavBar proporcionado */}
            <NavBar />

            {/* Sección Hero con animaciones */}
            <section
                ref={heroRef}
                className="relative h-[80vh] overflow-hidden"
            >
                {/* Imagen de fondo con parallax */}
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <Image
                        src="./fondo.svg"
                        alt="Repartidores de Movu"
                        fill
                        className="object-cover brightness-75"
                        priority
                    />
                </motion.div>

                {/* Efecto de gradiente superpuesto */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent z-5"></div>

                {/* Contenido superpuesto con animaciones */}
                <motion.div
                    className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold max-w-3xl tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <span className="text-white font-extrabold relative">
                            <span className="relative z-10">movu</span>
                            <span className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 blur-lg opacity-20 z-0"></span>
                        </span>
                        <span>, donde cada carga</span>
                        <motion.span
                            className="block mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            tiene su destino
                        </motion.span>

                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="mt-8"
                    >
                        <Link href="/login" >
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-10 py-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 cursor-pointer">
                            ¡Comienza Ahora!
                        </Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Sección descripción */}
            <motion.section
                className="py-24 px-5 md:px-8 max-w-6xl mx-auto text-center"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <motion.p
                    className="text-xl text-gray-700 max-w-4xl mx-auto font-normal leading-relaxed"
                    variants={fadeInUp}
                >
                    En{" "}
                    <span className="text-emerald-600 font-semibold">Movu</span>
                    , revolucionamos el transporte de fletes, mudanzas y
                    materiales con una plataforma flexible y transparente.
                    Conectamos a clientes con transportistas de confianza,
                    permitiéndote elegir la mejor opción según precio,
                    disponibilidad y ubicación. Cuidado de principio a fin y las
                    actualizaciones necesarias para que tu carga llegue segura y
                    a tiempo.
                </motion.p>

                {/* Botones de descarga con animación */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
                    variants={fadeInUp}
                    transition={{ delay: 0.2, staggerChildren: 0.1 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="#"
                            className="inline-block transition-transform cursor-pointer"
                        >
                            <Image
                                src="/googleplay.svg"
                                alt="Google Play"
                                width={180}
                                height={55}
                                className="h-auto shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
                            />
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href="#"
                            className="inline-block transition-transform cursor-pointer"
                        >
                            <Image
                                src="/appstore.svg"
                                alt="App Store"
                                width={180}
                                height={55}
                                className="h-auto shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* Ciudades disponibles */}
            <motion.section
                ref={ciudadesRef}
                id="ciudades"
                className="py-20 px-4 bg-gray-50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Ciudades Disponibles
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Movu está disponible en las principales ciudades de
                            Honduras, brindando servicios de transporte
                            confiables y eficientes.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {cities.map((city, index) => (
                            <CityCard
                                key={index}
                                city={city.name}
                                image={city.image}
                            />
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Sección Nuestros Servicios con animaciones */}
            <motion.section
                ref={serviciosRef}
                id="servicios"
                className="py-24 px-4 bg-gradient-to-b from-[#0a2540] to-[#061b30] text-white relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-emerald-300/10 blur-3xl"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.h2
                        className="text-4xl font-bold text-center mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Nuestros Servicios
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-center mb-16"
                    >
                        <p className="text-emerald-100/70">
                            Soluciones de transporte adaptadas a tus
                            necesidades, con la mejor calidad y compromiso
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                title={service.title}
                                icon={service.icon}
                                description={service.description}
                            />
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Acerca de Nosotros */}
            <motion.section
                ref={acercaRef}
                id="acerca"
                className="py-24 px-4 bg-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            Acerca de Nosotros
                        </h2>
                        <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                                <Image
                                    src="/fondo.svg"
                                    alt="Equipo Movu"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Nuestra Historia
                            </h3>
                            <p className="text-gray-600 mb-4">
                                En las calles de Honduras, donde el 70% de
                                transportistas como Isaac enfrentaban ingresos
                                inestables y largas esperas improductivas,
                                mientras profesionales de la construcción como
                                Lucía veían sus proyectos estancados por
                                problemas logísticos, nació una idea
                                transformadora. Gracias a nuestro equipo
                                multidisciplinario de desarrolladores y
                                diseñadores, que identificaron esta brecha en el
                                mercado y decidieron crear una solución
                                tecnológica que conectara ambos mundos de manera
                                eficiente y confiable.
                            </p>
                            <p className="text-gray-600 mb-6">
                                Así surgió Movu en 2024, la primera aplicación
                                hondureña especializada exclusivamente en fletes
                                y mudanzas, diseñada para reducir los tiempos de
                                espera en un 40% y aumentar la frecuencia de
                                viajes de los transportistas en un 50%. Con un
                                sistema de verificación de conductores,
                                seguimiento en tiempo real y una plataforma de
                                pagos integrada, Movu no solo revolucionó la
                                logística local sino que se posicionó como una
                                promesa de expansión regional, captando
                                rápidamente el interés del 85% de transportistas
                                y clientes potenciales encuestados, y abriendo
                                nuevas oportunidades económicas en un sector
                                tradicionalmente fragmentado e ineficiente.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                                        <InfoIcon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">
                                            Misión
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Transformar el transporte de cargas
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                                        <PhoneIcon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">
                                            Soporte 24/7
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            Siempre disponibles para ti
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Sección de contacto */}
            <motion.section
                ref={contactoRef}
                id="contacto"
                className="py-20 md:py-30 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto px-4">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-6"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        ¡Únete a la revolución del transporte!
                    </motion.h2>

                    <motion.p
                        className="text-lg text-white/90 mb-12 max-w-2xl mx-auto"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Miles de personas y empresas ya confían en Movu para sus
                        necesidades de transporte y logística. Descubre cómo
                        podemos ayudarte a simplificar tus envíos y mudanzas con
                        nuestra plataforma innovadora.
                    </motion.p>

                    <motion.div
                        className="mt-8"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button className="bg-white text-emerald-700 font-semibold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-emerald-800/30 transition-all duration-300 cursor-pointer">
                            Contacta con nosotros
                        </Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer */}
            <Footer />
        </main>
    );
}
