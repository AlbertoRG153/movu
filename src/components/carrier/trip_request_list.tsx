"use client";

import { useState } from "react";
import TripRequestCard from "./trip_request_card";
import TripRequestModal from "./trip_request_modal";

interface TripRequest {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    origin: string;
    destination: string;
    description: string;
}

export default function TripRequestList() {
    const [requests, setRequests] = useState<TripRequest[]>([
        {
            id: "1",
            name: "Carlos Medina",
            price: 1500,
            rating: 5,
            reviews: 0,
            origin: "Col. Aleman, Tegucigalpa",
            destination: "Res. Trapiche, Tegucigalpa",
            description: "3000 cajas de cafe",
        },
        {
            id: "2",
            name: "Cucharita",
            price: 1500,
            rating: 5,
            reviews: 0,
            origin: "Col. Kennedy, Tegucigalpa",
            destination: "Res. Honduras, Tegucigalpa",
            description: "2000 cajas de azúcar",
        },
        {
            id: "3",
            name: "Francisco Medina",
            price: 1500,
            rating: 3,
            reviews: 0,
            origin: "Col. Miraflores, Tegucigalpa",
            destination: "Res. La Hacienda, Tegucigalpa",
            description: "1500 cajas de arroz",
        },
        {
            id: "4",
            name: "Cesar Medina",
            price: 1500,
            rating: 5,
            reviews: 0,
            origin: "Col. Palmira, Tegucigalpa",
            destination: "Res. El Prado, Tegucigalpa",
            description: "2500 cajas de frijoles",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<TripRequest | null>(
        null
    );

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

    const handleViewDetails = (request: TripRequest) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleSubmitOffer = (newPrice: number) => {
        if (selectedRequest) {
            // Here you would typically send this to your API
            console.log(`New offer for ${selectedRequest.name}: L${newPrice}`);

            // Update the local state (optional)
            setRequests(
                requests.map((req) =>
                    req.id === selectedRequest.id
                        ? { ...req, price: newPrice }
                        : req
                )
            );
        }
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
                        onViewDetails={() => handleViewDetails(request)}
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
            {selectedRequest && (
                <TripRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmitOffer}
                    tripDetails={{
                        origin: selectedRequest.origin,
                        destination: selectedRequest.destination,
                        description: selectedRequest.description,
                        currentOffer: selectedRequest.price,
                    }}
                />
            )}
        </div>
    );
}
