"use client"

import type React from "react"
import  Image from "next/image"
import { useState } from "react"
import { Eye, EyeOff, FileLock, User2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ResetForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen p-4", className)} {...props}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <Card className="border-none shadow-sm">
        <div  className="flex justify-center">
                    <Image 
                    src="/image.svg"
                    alt="Logo"
                    width={125}
                    height={125}
                    layout="fixed"
                    />
                    </div>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center text-[#0a2540]">Restablecer Contaseña</CardTitle>
          </CardHeader>
          <div>
          <p>
            Para restablecer su contraseña, ingrese su nombre de usuario o número de celular 
            y siga las instrucciones que recibirá por correo electrónico.
            </p>
            <p className="text-gray-500 text-sm">
              Si aún no ha recibido el correo, asegúrese de verificar su bandeja de entrada y de spam.
            </p>
            <p className="text-gray-500 text-sm">
              Si aún no puede recuperar su contraseña, póngase en contacto con el administrador del sitio.
            </p>
            <Button className="w-full mt-6" size="lg">
              Restablecer Contraseña
            </Button>
          </div>
          <CardContent>
            <form>
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <User2Icon size={18} />
                    </div>
                    <Input
                      id="username"
                      className="pl-10 py-6 border-gray-200"
                      placeholder="Nombre de usuario o numero celular"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <FileLock size={18} />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 py-6 pr-10 border-gray-200"
                      placeholder="Contraseña"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                <Button type="submit" className="w-full py-6 bg-emerald-400 hover:bg-emerald-500 text-white">
                  Acceder
                </Button>
              </div>
              <div className="mt-6 text-center text-sm text-gray-500">
                ¿Nuevo usuario?{" "}
                <a href="#" className="text-emerald-500 hover:text-emerald-600 font-medium">
                  Crear usuario nuevo
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

