"use client";

import { Star } from "lucide-react";

interface TripRequestCardProps {
    request: {
        id: string;
        name: string;
        price: number;
        rating: number;
        reviews: number;
        origin: string;
        destination: string;
        description: string;
        date?: string;
        service_type?: string;
    };
    onAccept: () => void;
    onReject: () => void;
    onViewDetails: () => void;
}

export default function TripRequestCard({
    request,
    onAccept,
    onReject,
    onViewDetails,
}: TripRequestCardProps) {
    // Formatear fecha si existe
    const formattedDate = request.date 
        ? new Date(request.date).toLocaleDateString('es-HN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
          })
        : 'Fecha no disponible';

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Header section with user name and price */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h3 className="font-medium text-base">{request.name}</h3>
                    <div className="flex items-center text-sm text-yellow-500">
                        <Star size={14} fill="currentColor" />
                        <span className="ml-1">
                            {request.rating} ({request.reviews} reseñas)
                        </span>
                    </div>
                </div>
                <div className="font-medium text-lg">L {request.price}</div>
            </div>

            {/* Trip details */}
            <div className="space-y-2 mb-4">
                <div className="text-sm">
                    <span className="font-medium">Tipo: </span>
                    <span className="text-gray-700">{request.service_type || "No especificado"}</span>
                </div>
                <div className="text-sm">
                    <span className="font-medium">Fecha: </span>
                    <span className="text-gray-700">{formattedDate}</span>
                </div>
                <div className="text-sm">
                    <span className="font-medium">Origen: </span>
                    <span className="text-gray-700">{request.origin}</span>
                </div>
                <div className="text-sm">
                    <span className="font-medium">Destino: </span>
                    <span className="text-gray-700">{request.destination}</span>
                </div>
                <div className="text-sm">
                    <span className="font-medium">Descripción: </span>
                    <span className="text-gray-700">{request.description}</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-2">
                <button
                    onClick={onViewDetails}
                    className="flex-1 py-2 border border-emerald-400 text-emerald-400 rounded-md font-medium"
                >
                    Ver detalles
                </button>
                <button
                    onClick={onAccept}
                    className="flex-1 py-2 bg-emerald-400 text-white rounded-md font-medium"
                >
                    Aceptar
                </button>
                <button
                    onClick={onReject}
                    className="flex-1 py-2 bg-red-500 text-white rounded-md font-medium"
                >
                    Rechazar
                </button>
            </div>
        </div>
    );
}