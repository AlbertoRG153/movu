import { useRouter } from "next/navigation";
import Image from "next/image";

export function MainView() {
    const router = useRouter();

    const nextShippingForm = () => {
        router.push("/customer/shipping_form"); 
    }
    return (
        
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#092A39]/95 text-gray-700 overflow-hidden">
        <p className="text-lg font-semibold text-white/85 text-center px-4">
          Listo para moverte con nosotros
        </p>
  
        {/* Botón Flete fijo abajo */}
        <div className="fixed bottom-4 w-8/10 py-2">
          <div className="bg-white/95 shadow-lg rounded-xl px-5 py-4 flex flex-col items-center w-full max-w-md mx-auto">
            <div className=" bg-white/96 flex flex-col items-center  shadow-lg rounded-xl border-r-1 px-8 py-1 " onClick={nextShippingForm}>
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
