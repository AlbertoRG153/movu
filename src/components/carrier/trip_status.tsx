"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TripStatus() {
    const [estimatedTime] = useState(30);
    const [tripTime] = useState(20);

    return (
        <div className="relative w-full h-screen bg-gray-100">
            {/* Map Section */}
            <div className="relative w-full h-full">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gray-200">
                    <Image
                        src="/"
                        alt="Map"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Driver Info Card */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <Card className="rounded-t-3xl p-5 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage
                                        src="/placeholder.svg?height=40&width=40"
                                        alt="Driver"
                                    />
                                    <AvatarFallback>CM</AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-medium text-sm">
                                            Maria Valladares
                                        </p>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                            <span className="text-xs ml-1">
                                                0 (0)
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        className="h-12 px-3 rounded-lg bg-green-100 hover:bg-green-200 flex flex-col items-center justify-center"
                                        aria-label="Call driver"
                                    >
                                        <Phone className="h-5 w-5 text-green-600 mb-1" />
                                        <span className="text-green-600 font-medium text-xs">
                                            Llamar
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">L 1500.00</p>
                            </div>
                            <div className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
                                {estimatedTime} min
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Tiempo estimado del viaje
                                </p>
                                <p className="font-medium">{tripTime} min</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm ">Estado:</p>
                                <p className="text-sm">En camino</p>
                            </div>
                        </div>

                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-md">
                            Finalizar viaje
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
