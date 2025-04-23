import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function SupportCarrierPage() {
  return (
    <div className="min-h-screen bg-[#0a2536] flex flex-col items-center">
      <header className="w-full p-4 flex items-center justify-center">
        <h1 className="text-white text-xl font-medium">Soporte</h1>
      </header>

      <main className="w-full max-w-md px-4">
        <div className="bg-white rounded-xl p-6 shadow-lg mt-3">
          <div className="mb-6">
            <h2 className="text-[#0a2536] font-medium mb-4">Temas principales</h2>

            <div className="space-y-4">
              <Link href="/carrier/support/city" className="flex items-center justify-between py-2">
                <span className="text-gray-700">Ciudad</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
              <Link href="/carrier/support/freight" className="flex items-center justify-between py-2">
                <span className="text-gray-700">Fletes</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-[#0a2536] font-medium mb-4">Más</h2>

            <div className="space-y-4">
              <Link href="/carrier/support/problem" className="flex items-center justify-between py-2">
                <span className="text-gray-700">Problemas con la aplicación</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>

              <Link href="/carrier/support/about" className="flex items-center justify-between py-2">
                <span className="text-gray-700">Acerca de movu</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
