import Image from "next/image";
import { Car, History } from "lucide-react";
import Link from "next/link";

export function MainView() {
    return (
        <div className="min-h-screen bg-[#0a2240] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                {/* Welcome message */}
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-12 text-center">
                    ¡Bienvenido , carlos.ramirez
                </h1>

                {/* Logo */}
                <div className="mb-8">
                    <Image
                        src="/Logo_movu_bw_2.png"
                        alt="Movu Logo"
                        width={200}
                        height={120}
                        priority
                    />
                </div>

                {/* Tagline */}
                <p className="text-white text-center text-lg mb-12 max-w-3xl">
                    Explora tu panel de conductor y mejora tu experiencia en
                    carretera. Todo lo que necesitás en un solo lugar Movu.
                </p>

                {/* Action cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {/* Start Trip Card */}
                    <div className="bg-[#0c2e4a] rounded-lg p-8 flex flex-col items-center">
                        <div className="mb-4">
                            <Car className="w-12 h-12 text-white" />
                        </div>
                        <Link href={"/carrier/trip_request"}>
                            <h2 className="text-white text-2xl font-semibold mb-8">
                                Iniciar Viaje
                            </h2>
                        </Link>
                        <button className="w-full bg-[#00b67a] hover:bg-[#00a06b] text-white py-3 rounded-md transition-colors">
                            Iniciar
                        </button>
                    </div>

                    {/* View History Card */}
                    <div className="bg-[#0c2e4a] rounded-lg p-8 flex flex-col items-center">
                        <div className="mb-4">
                            <History className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-white text-2xl font-semibold mb-8">
                            Ver Historial
                        </h2>
                        <button className="w-full bg-[#00b67a] hover:bg-[#00a06b] text-white py-3 rounded-md transition-colors">
                            Historial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
