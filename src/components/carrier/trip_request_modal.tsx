"use client";

import { useState } from "react";

interface TripRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (price: number) => void;
    tripDetails: {
        origin: string;
        destination: string;
        description: string;
        currentOffer: number;
    };
}

export default function TripRequestModal({
    isOpen,
    onClose,
    onSubmit,
    tripDetails,
}: TripRequestModalProps) {
    const [offerPrice, setOfferPrice] = useState(tripDetails.currentOffer);

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(offerPrice);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#092A39] text-white rounded-lg w-full max-w-md mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Información del pedido
                    </h2>

                    <div className="space-y-3">
                        <div>
                            <span className="font-medium">
                                Lugar de recogida:{" "}
                            </span>
                            <span>{tripDetails.origin}</span>
                        </div>

                        <div>
                            <span className="font-medium">
                                Lugar de destino:{" "}
                            </span>
                            <span>{tripDetails.destination}</span>
                        </div>

                        <div>
                            <span className="font-medium">Descripción: </span>
                            <span>{tripDetails.description}</span>
                        </div>

                        <div>
                            <span className="font-medium">Oferta actual: </span>
                            <span>L {tripDetails.currentOffer}</span>
                        </div>

                        <div>
                            <span className="font-medium">Nueva Oferta: </span>
                            <input
                                type="number"
                                value={offerPrice}
                                onChange={(e) =>
                                    setOfferPrice(Number(e.target.value))
                                }
                                className="bg-gray-700 text-white rounded px-3 py-2 w-full mt-1"
                                min={tripDetails.currentOffer}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-gray-600 text-white rounded-md font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 py-3 bg-[#2DF1A9] text-gray-800 rounded-md font-medium"
                        >
                            Enviar petición
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
