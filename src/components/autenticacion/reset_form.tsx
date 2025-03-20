"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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

function StepOne({ nextStep }: { nextStep: () => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Paso 1</h2>
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

function StepTwo({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Paso 2</h2>
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
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

function StepThree({ prevStep }: { prevStep: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Paso 3</h2>
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          className="pl-10 py-2 pr-10 border-gray-200 w-full"
          placeholder="Contraseña"
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
      <div className="mt-6 text-center text-sm text-gray-500">
        ¿Nuevo usuario?{" "}
        <a href="#" className="text-emerald-500 hover:text-emerald-600 font-medium">
          Crear usuario nuevo
        </a>
      </div>
    </div>
  );
}
