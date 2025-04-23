"use client";

import { useState } from "react";
import TripRequestCard from "./trip_request_card";

interface TripRequest {
    id: string;
    name: string;
    price: number;
    plate: string;
    rating: number;
    reviews: number;
}

export default function TripRequestList() {
    const [requests, setRequests] = useState<TripRequest[]>([
        {
            id: "1",
            name: "Carlos Medina",
            price: 1500,
            plate: "AA00D",
            rating: 5,
            reviews: 0,
        },
        {
            id: "2",
            name: "Cucharita",
            price: 1500,
            plate: "AA010",
            rating: 5,
            reviews: 0,
        },
        {
            id: "3",
            name: "Francisco Medina",
            price: 1500,
            plate: "AA003",
            rating: 3,
            reviews: 0,
        },
        {
            id: "4",
            name: "Cesar Medina",
            price: 1500,
            plate: "AA900",
            rating: 5,
            reviews: 0,
        },
    ]);

    const handleAccept = (id: string) => {
        setRequests(requests.filter((request) => request.id !== id));
    };

    const handleReject = (id: string) => {
        setRequests(requests.filter((request) => request.id !== id));
    };

    const handleCancel = () => {
        // Handle cancel action
        console.log("Cancelled");
    };

    return (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
            <header className="flex items-center justify-center p-4 bg-white">
                <h1 className="text-center text-lg font-medium text-gray-800">
                    Solicitud de Viaje
                </h1>
                <div className="w-8"></div> {/* Spacer for alignment */}
            </header>

            <div className="flex-1 p-4 overflow-auto space-y-4">
                {requests.map((request) => (
                    <TripRequestCard
                        key={request.id}
                        request={request}
                        onAccept={() => handleAccept(request.id)}
                        onReject={() => handleReject(request.id)}
                    />
                ))}
            </div>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleCancel}
                    className="w-full py-3 bg-red-500 text-white rounded-md font-medium"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
