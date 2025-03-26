"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import  Image from "next/image"


export function ResetForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => (prev < 3 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {step === 1 && <StepOne nextStep={nextStep} />}
        {step === 2 && <StepTwo nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <StepThree prevStep={prevStep} />}
      </div>
    </div>
  );
}
{/* Paso uno para restablecer contrasena */}
function StepOne({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div  className="flex justify-center">
                <Image 
                src="/image.svg"
                alt="Logo"
                width={125}
                height={125}
                layout="fixed"
                />
                </div>
      
      <h2 className="text-xl font-semibold mb-4">Restablecer contraseña</h2>
      <p className="text-ms  mb-4">
        Por seguridad del usuario se le mandara un correo
        con un codigo, el cual tendra una 
        duracion de 3 minuto.
        Para restablecer su contraseña ingrese los
          siguientes datos solicitados;</p>
      <input
        type="text"
        placeholder="Ingrese su nombre de usuario"
        className="w-full p-2 border rounded mb-4"
      /> 
      <div className="flex justify-end">
        <Button onClick={nextStep} className="bg-emerald-400">
          Continuar
        </Button>
      </div>
    </div>
  );
}
{/* Paso 2 codigo de verificacion  */}
function StepTwo({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div  className="flex justify-center">
                <Image 
                src="/image.svg"
                alt="Logo"
                width={125}
                height={125}
                layout="fixed"
                />
                </div>
      <h2 className="text-xl font-semibold mb-4">Codigo de verificacion</h2>
      <p className="text-ms  mb-4">
      Ingrese el codigo de verificacion que se le envio a su correo 
          “eje*******@gmail.com” sin guiones, para
          poder restablecer su contraseña
        </p>
          <input 
          type="text" 
          placeholder="000-000" 
          pattern="\d{3}-\d{3}" 
          maxLength={7} 
          className="w-full p-2 outline-none text-center tracking-widest" 
        />
      <div className="flex justify-between mt-4">
        <Button onClick={prevStep} className="bg-gray-400">
          Regresar
        </Button>
        <Button onClick={nextStep} className="bg-emerald-400">
          Continuar
        </Button>
      </div>
    </div>
  );
}
{/* Paso 3 codigo de verificacion  */}
function StepThree({ prevStep }: { prevStep: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div  className="flex justify-center">
                <Image 
                src="/image.svg"
                alt="Logo"
                width={125}
                height={125}
                layout="fixed"
                />
                </div>      
      <h2 className="text-xl font-semibold mb-4">Restablecer Contraseña </h2>
      <p className="text-ms  mb-4">
     Ingrese su nueva contraseña recuerde que la contraseña debe
      contener lo siguiente:Mas de 8 caracteres
    Al menos una letra mayuscula Incluir minusculas
    Al menos un caracter especial,@¿?=()/&% $·”!-+*._
    Al menos un numero
    No utilice una clave de otro sitio, ni un
        nombre demasiado comun
        </p>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          className=" border-gray-200 w-full border rounded m-2"
          placeholder="Ingrese su nueva contraseña"
        />
        <input 
          type="password" 
          placeholder="Confirme su nueva contraseña" 
          className=" py-2 border-gray-200 w-full  border rounded mt-2" 
        />
    
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
        >
        
        </button>
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={prevStep} className="bg-gray-400">
          Regresar
        </Button>
        <Button className="bg-emerald-400">Finalizar</Button>
      </div>
    </div>
  );
}
