"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, FileLock, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/supabase/supabaseFuntions";


export function LoginConductor({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(email, password);

      if (user) {
        console.log("Usuario autenticado:", user);

        if (typeof window !== "undefined") {
          localStorage.setItem("main_view", JSON.stringify({ 
            email, 
            username: email.split("@")[0]
          }));
        }

        router.push("/main_view");
      } else {
        setError("Error en la autenticación. Verifique sus credenciales.");
      }
    } catch (err) {
      setError((err as Error).message || "Ocurrió un error. Inténtelo de nuevo.");
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen p-4", className)} {...props}>
      <div className="w-full max-w-md">
        <Card className="border-none shadow-sm">
          <div className="flex justify-center">
            <Image 
              src="/Logo_movu_v2.png"
              alt="Logo"
              width={125}
              height={125}
              layout="fixed"
            />
          </div>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center text-[#0a2540]">Inicio de Sesión modo Conductor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <div className="relative">
                  <User2Icon className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10 py-6 border-gray-200"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <FileLock className="absolute left-3 top-3 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="pl-10 py-6 pr-10 border-gray-200"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div className="text-right">
                  <a href="/restore" className="text-sm text-gray-500 hover:text-gray-700">
                    ¿Olvidó su contraseña?
                  </a>
                </div>

                <Button type="submit" style={{ backgroundColor: '#092A39' }} className="w-full py-6 bg-emerald-400 hover:bg-emerald-500 text-white">
                  Acceder
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                ¿Nuevo usuario?{" "}
                <a href="/register_conductor" className="text-emerald-500 hover:text-emerald-600 font-medium">
                  Crear usuario
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
