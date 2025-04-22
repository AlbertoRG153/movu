'use client'

import Image from "next/image"
import { useRouter } from 'next/navigation'
import { ChevronRight} from 'lucide-react'



export const MainViewNoCarrier = () => {
  const router = useRouter()


  localStorage.setItem('redirect_back_to', window.location.pathname)

  const handleDriverRegister = () => {
    router.push('/carrier_register/information')
  }

  


  return (
    <div className="relative flex flex-col justify-start p-9  h-[100vh] w-full top-0 px-4">
      <div className="flex flex-col sm:flex-row w-full justify-center gap-6 px-3 ">
        
         {/* Card informacion de como obtener ganancias */}
         <div className="bg-[#092A39]/95 w-full sm:w-[80%] rounded-2xl p-6 shadow-md mt-10">
          <h3 className="text-white text-x2 font-semibold mb-1">¡Obten ganancias con nosotros!</h3>
          <p className="text-white/75 text-xs mb-2">Forma parte de nuestra familia de fleteros, ya que con movu obtienes beneficios como:</p>
          <p className="text-white/75 text-xs mb-1">Horarios flexibles</p>
          <p className="text-white/75 text-xs mb-1">Tus propios precios</p>
          <p className="text-white/75 text-xs mb-1">Pagos bajos por los servicios</p>

        </div>

        {/* Card fletero */}
        <div className="bg-[#092A39]/95 w-full sm:w-[80%] rounded-2xl p-6 shadow-md">
          <h3 className="text-white text-x2 font-semibold mb-1">Registrate y comienza a obtener ganancias con nosotros</h3>
          <p className="text-white/75 text-xs mb-4">Elige una forma y regístrate.</p>
          <div className="relative flex items-center justify-between w-full top-0 px-4" onClick={handleDriverRegister}>
            <div>
              <Image
                src="/camion.png"
                alt="Flete"
                width={40}
                height={40}
              />
            </div>
            <div>
              <h3 className="text-white text-x2 font-semibold">Fletes</h3>
              <p className="text-white/75 text-xs">Negocia tus tarifas</p>
            </div>
            <div className="flex items-center">
              <ChevronRight size={20} color="white" />
            </div>
          </div>
        </div>

        {/* Boton volver a modo conductor */}
        <div className="flex justify-center p-4 w-full">
          <div className="w-1/2">
            <button
              className="w-full bg-[#16d6a1] text-[#0d2a33] font-medium py-3 rounded-full hover:bg-[#14c091] transition-colors"
              onClick={() => router.push('/customer/main_view')}
            >
              Modo cliente
            </button>
          </div>
        </div>

        
      </div>
    </div>
  )
}
