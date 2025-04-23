'use client'

import { useRouter } from 'next/navigation'



export const MainViewPeding = () => {
  const router = useRouter()


  localStorage.setItem('redirect_back_to', window.location.pathname)


  


  return (
    <div className="relative flex flex-col justify-start p-9  h-[100vh] w-full top-0 px-4">
      <div className="flex flex-col sm:flex-row w-full justify-center gap-6 px-3 ">
        
         {/* Card informacion de como obtener ganancias */}
         <div className="bg-[#092A39]/95 w-full sm:w-[80%] rounded-2xl p-6 shadow-md mt-10">
          {/* Título centrado */}
          <h3 className="text-xl font-semibold text-white text-center">Ya casi listo</h3>

          {/* Mensaje de verificación */}
          <p className="text-yellow-400 font-semibold text-center mt-2">Pendiente de verificación para conductor</p>

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
