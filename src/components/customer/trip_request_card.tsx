"use client";

import { User } from "lucide-react";

interface TripRequestProps {
    request: {
        id: string;
        name: string;
        price: number;
        code: string;
        rating: number;
        reviews: number;
    };
    onAccept: () => void;
    onReject: () => void;
}

export default function TripRequestCard({
    request,
    onAccept,
    onReject,
}: TripRequestProps) {
    return (
        <div className="bg-[#092A39] text-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-200 rounded-full p-2">
                        <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="font-medium">{request.name}</span>
                </div>
                <div className="text-right">
                    <div className="font-medium">
                        L {request.price.toFixed(2)}
                    </div>
                    <div className="text-sm">{request.code}</div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={i < request.rating} />
                        ))}
                    </div>
                    <span className="ml-1 text-sm">({request.reviews})</span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onReject}
                        className="px-4 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                    >
                        Rechazar
                    </button>
                    <button
                        onClick={onAccept}
                        className="px-4 py-1 bg-[#2DF1A9] text-gray-800 rounded-full text-sm font-medium"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}

function StarIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            className={`w-4 h-4 ${
                filled ? "text-yellow-400" : "text-gray-400"
            }`}
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
        </svg>
    );
}
