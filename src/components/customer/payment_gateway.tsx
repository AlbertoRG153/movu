"use client";

import type React from "react";

import { useState } from "react";
import { CreditCard, DollarSign, CheckCircle } from "lucide-react";

export default function PaymentGateway() {
    const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccess(true);
        // In a real implementation, this would process the payment
    };

    const handleBack = () => {
        setShowSuccess(false);
    };

    return (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
            <header className="flex items-center justify-center p-4 bg-white">
                <h1 className="text-center text-lg font-medium text-gray-800">
                    Pasarela de Pago
                </h1>
                <div className="w-8"></div> {/* Spacer for alignment */}
            </header>

            <div className="flex-1 p-4 overflow-auto">
                {!showSuccess ? (
                    <div className="space-y-4">
                        <div className="bg-[#092A39] text-white rounded-lg p-4 shadow-md">
                            <h2 className="text-lg font-medium mb-2">
                                Detalles del pago
                            </h2>
                            <div className="flex justify-between items-center">
                                <span>Servicio de transporte</span>
                                <span className="text-xl font-bold">
                                    L 1500.00
                                </span>
                            </div>
                        </div>

                        <div className="bg-[#092A39] text-white rounded-lg p-4 shadow-md">
                            <h2 className="text-lg font-medium mb-4">
                                Método de pago
                            </h2>

                            <div className="space-y-3">
                                <div
                                    className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${
                                        paymentMethod === "card"
                                            ? "border-[#2DF1A9]"
                                            : "border-gray-600"
                                    }`}
                                    onClick={() => setPaymentMethod("card")}
                                >
                                    <div className="bg-gray-200 rounded-full p-2">
                                        <CreditCard className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        Tarjeta de crédito/débito
                                    </div>
                                    {paymentMethod === "card" && (
                                        <div className="h-5 w-5 rounded-full bg-[#2DF1A9] flex items-center justify-center">
                                            <div className="h-2 w-2 rounded-full bg-[#2d4a54]"></div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`border rounded-lg p-3 cursor-pointer flex items-center gap-3 ${
                                        paymentMethod === "cash"
                                            ? "border-[#2DF1A9]"
                                            : "border-gray-600"
                                    }`}
                                    onClick={() => setPaymentMethod("cash")}
                                >
                                    <div className="bg-gray-200 rounded-full p-2">
                                        <DollarSign className="h-5 w-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        Pago en efectivo
                                    </div>
                                    {paymentMethod === "cash" && (
                                        <div className="h-5 w-5 rounded-full bg-[#2DF1A9] flex items-center justify-center">
                                            <div className="h-2 w-2 rounded-full bg-[#2d4a54]"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {paymentMethod === "card" ? (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-[#092A39] text-white rounded-lg p-4 shadow-md"
                            >
                                <h2 className="text-lg font-medium mb-4">
                                    Información de tarjeta
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="cardNumber"
                                            className="block text-sm mb-1"
                                        >
                                            Número de tarjeta
                                        </label>
                                        <input
                                            id="cardNumber"
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-[#2DF1A9] focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="cardHolder"
                                            className="block text-sm mb-1"
                                        >
                                            Nombre en la tarjeta
                                        </label>
                                        <input
                                            id="cardHolder"
                                            type="text"
                                            placeholder="Nombre completo"
                                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-[#2DF1A9] focus:outline-none"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label
                                                htmlFor="expiryDate"
                                                className="block text-sm mb-1"
                                            >
                                                Fecha de expiración
                                            </label>
                                            <input
                                                id="expiryDate"
                                                type="text"
                                                placeholder="MM/AA"
                                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-[#2DF1A9] focus:outline-none"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                htmlFor="cvv"
                                                className="block text-sm mb-1"
                                            >
                                                CVV
                                            </label>
                                            <input
                                                id="cvv"
                                                type="text"
                                                placeholder="123"
                                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-[#2DF1A9] focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-center text-sm text-gray-300">
                                    <p>Pago seguro con encriptación SSL</p>
                                    <div className="flex justify-center gap-2 mt-2">
                                        <span className="bg-white text-[#2d4a54] px-2 py-1 rounded text-xs font-bold">
                                            VISA
                                        </span>
                                        <span className="bg-white text-[#2d4a54] px-2 py-1 rounded text-xs font-bold">
                                            MASTERCARD
                                        </span>
                                        <span className="bg-white text-[#2d4a54] px-2 py-1 rounded text-xs font-bold">
                                            AMEX
                                        </span>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-[#092A39] text-white rounded-lg p-4 shadow-md">
                                <h2 className="text-lg font-medium mb-4">
                                    Pago en efectivo
                                </h2>
                                <p className="mb-4">
                                    Paga en efectivo al momento de la entrega o
                                    servicio.
                                </p>
                                <div className="bg-gray-700 rounded-lg p-3 mb-4">
                                    <p className="text-sm text-gray-300 mb-1">
                                        Instrucciones:
                                    </p>
                                    <p>1. Prepara el monto exacto: L 1500.00</p>
                                    <p>
                                        2. Entrega el dinero al conductor o
                                        personal de servicio
                                    </p>
                                    <p>3. Solicita tu recibo de pago</p>
                                </div>
                                <div className="flex items-center gap-2 text-yellow-300 mb-4">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-sm">
                                        El pago en efectivo solo está disponible
                                        para entregas locales.
                                    </span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 bg-[#2DF1A9] text-gray-800 rounded-md font-medium"
                        >
                            {paymentMethod === "card"
                                ? "Pagar con tarjeta"
                                : "Confirmar pago en efectivo"}
                        </button>

                        <button className="w-full py-3 bg-red-500 text-white rounded-md font-medium mt-3">
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <div className="bg-[#2d4a54] text-white rounded-lg p-6 shadow-md">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                                <CheckCircle className="h-10 w-10 text-green-500" />
                            </div>
                            <h2 className="text-xl font-medium">
                                ¡Pago confirmado!
                            </h2>
                            <p className="text-gray-300 mt-2">
                                {paymentMethod === "card"
                                    ? "Tu pago con tarjeta ha sido procesado exitosamente."
                                    : "Tu pago en efectivo ha sido registrado. Recuerda tener el monto exacto."}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="border-b border-gray-600 pb-2">
                                <p className="text-gray-300 text-sm">Monto</p>
                                <p className="text-xl font-bold">L 1500.00</p>
                            </div>

                            <div className="border-b border-gray-600 pb-2">
                                <p className="text-gray-300 text-sm">
                                    Método de pago
                                </p>
                                <p>
                                    {paymentMethod === "card"
                                        ? "Tarjeta de crédito/débito"
                                        : "Efectivo"}
                                </p>
                            </div>

                            <div className="border-b border-gray-600 pb-2">
                                <p className="text-gray-300 text-sm">
                                    Fecha y hora
                                </p>
                                <p>{new Date().toLocaleString()}</p>
                            </div>

                            {paymentMethod === "card" && (
                                <div className="border-b border-gray-600 pb-2">
                                    <p className="text-gray-300 text-sm">
                                        ID de transacción
                                    </p>
                                    <p className="font-mono text-sm">
                                        TRX-{Date.now()}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 space-y-3">
                            <button className="w-full py-3 bg-white text-[#2d4a54] rounded-md font-medium">
                                Ver detalles del servicio
                            </button>

                            <button
                                onClick={handleBack}
                                className="w-full py-3 border border-[#2DF1A9] text-[#2DF1A9] rounded-md font-medium"
                            >
                                Volver al inicio
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
