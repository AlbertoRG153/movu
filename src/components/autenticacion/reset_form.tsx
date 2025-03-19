"use client"

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input} from "@/components/ui/input";
import {
  InputOTP,
 InputOTPGroup,
 InputOTPSeparator,
 InputOTPSlot,
} from "@/components/ui/input-otp"


export function ResetForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => (prev < 3 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {step === 1 && <StepOne nextStep={nextStep} prevStep={prevStep} />}
        {step === 2 && <StepTwo nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <StepThree nextStep={nextStep} prevStep={prevStep} />}
      </div>
    </div>
  );
}

function StepOne({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Paso 1</h2>
      <input type="text" placeholder="Ingrese su nombre de usuario" className="w-full p-2 border rounded mb-4" />
      <div className="flex justify-between">
        <Button onClick={prevStep} className="bg-gray-400">Regresar</Button>
        <Button onClick={nextStep} className="bg-emerald-400">Continuar</Button>
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
      <div className="flex justify-between">
        <Button onClick={prevStep} className="bg-gray-400">Regresar</Button>
        <Button onClick={nextStep} className="bg-emerald-400">Continuar</Button>
      </div>
    </div>
  );
}

function StepThree({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Paso 3</h2>
      <Input
                      id="password"
                      className="pl-10 py-6 pr-10 border-gray-200"
                      placeholder="Contraseña"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400"
                    ></button>  
      <div className="flex justify-between">
        <Button onClick={prevStep} className="bg-gray-400">Regresar</Button>
        <Button onClick={nextStep} className="bg-emerald-400">Continuar</Button>
      </div>
    </div>
  );
}
