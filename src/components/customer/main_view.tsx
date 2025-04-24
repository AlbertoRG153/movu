import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export function MainView() {
    const router = useRouter();

    const nextShippingForm = () => {
        router.push("/customer/shipping_form"); 
    }
    return (
        <div className="relative flex flex-col items-center min-h-screen w-full bg-[#092A39]/95 text-gray-700 overflow-hidden">
            {/* Contenido superior y central */}
            <div className="flex-grow flex flex-col items-center justify-center w-full">
                <p className="text-lg font-semibold text-white/85 text-center px-4">
                    Listo para moverte con nosotros
                </p>
            </div>
            
            {/* Área de botones fijos al final */}
            <div className="w-full px-4 pb-4">
                {/* Botón Iniciar */}
                <Link href={"/customer/trip_request"} className="w-full block mb-4">
                    <div className="w-full bg-[#00b67a] hover:bg-[#00a06b] text-white py-3 rounded-md transition-colors text-center">
                        Solicitudes
                    </div>
                </Link>
                
                {/* Botón Flete */}
                <div className="bg-white/95 shadow-lg rounded-xl px-5 py-4 flex justify-center w-full">
                    <div 
                        className="bg-white/96 flex flex-col items-center shadow-lg rounded-xl border-r-1 px-8 py-1 cursor-pointer" 
                        onClick={nextShippingForm}
                    >
                        <Image
                            src="/camion.png"
                            alt="Flete"
                            width={40}
                            height={40}
                        />
                        <p className="text-gray-700 font-medium">Flete</p>
                    </div>
                </div>
            </div>
        </div>
    );
}