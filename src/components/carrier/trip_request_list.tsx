"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
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
    date: string;
    service_type: string;
}

export default function TripRequestList() {
    const [requests, setRequests] = useState<TripRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<TripRequest | null>(
        null
    );

    // Cargar las solicitudes de Supabase
    useEffect(() => {
        const fetchTripRequests = async () => {
            try {
                setLoading(true);
                
                // Verificar que la conexión a Supabase esté funcionando
                if (!supabase) {
                    throw new Error("La conexión a Supabase no está disponible");
                }
                
                // Simplificamos la consulta para evitar problemas con relaciones
                const { data: tripData, error: tripError } = await supabase
  .from('travel_request')
  .select(`
    *,
    person (
      first_name,
      first_surname
    )
  `)
  .order('date', { ascending: false });



                
                if (tripError) {
                    console.error("Error de Supabase:", tripError);
                    throw new Error(tripError.message);
                }

            
                if (tripData) {
                    console.log("Datos recibidos:", tripData);
                    
                    // Transformar los datos al formato que espera el componente
                    const formattedRequests = tripData.map(trip => {
                        // Extraer las coordenadas para origen y destino
                        const originCoords = trip.origin_place?.split(',') || [];
                        const destCoords = trip.destination_place?.split(',') || [];
                        
                        return {
                            id: trip.id,
                            name: trip.person ? `${trip.person.first_name} ${trip.person.first_surname}` : "Usuario",
                            price: trip.price || 0,
                            rating: 0, // Valor por defecto
                            reviews: 0, // Valor por defecto
                            origin: originCoords.length >= 2 && originCoords[0] && originCoords[1]
                            ? `${originCoords[0].slice(0, 6)}, ${originCoords[1].slice(0, 6)}`
                            : "No especificado",
                          destination: destCoords.length >= 2 && destCoords[0] && destCoords[1]
                            ? `${destCoords[0].slice(0, 6)}, ${destCoords[1].slice(0, 6)}`
                            : "No especificado",                          
                            description: trip.description || "Sin descripción",
                            date: trip.date,
                            service_type: trip.id_service_type === "7dcdd948-75bc-46b5-bcec-6e47e827b24b" ? "Flete" : "Mudanza"
                        };
                    });
                    
                    setRequests(formattedRequests);
                } else {
                    setRequests([]);
                }
            } catch (err) {
                console.error("Error fetching trip requests:", err);
                setError("No se pudieron cargar las solicitudes: " + (err instanceof Error ? err.message : String(err)));
            } finally {
                setLoading(false);
            }
        };

        fetchTripRequests();
        
        // Suscribirse a cambios en la tabla travel_request
        const subscription = supabase
            .channel('table-changes')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'travel_request' }, 
                (payload) => {
                    console.log("Cambio detectado:", payload);
                    // Recargar los datos cuando haya cambios
                    fetchTripRequests();
                }
            )
            .subscribe();
            
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleAccept = async (id: string) => {
        try {
            // Aquí podrías actualizar el estado de la solicitud en Supabase
            const { error } = await supabase
                .from("travel_request")
                .update({ status: "accepted" })
                .eq("id", id);
                
            if (error) throw error;
                
            // Actualizar la lista local de solicitudes
            setRequests(requests.filter((request) => request.id !== id));
        } catch (err) {
            console.error("Error accepting request:", err);
            alert("No se pudo aceptar la solicitud");
        }
    };

    const handleReject = async (id: string) => {
        try {
            // Cambiar estado a "rejected" en Supabase
            const { error } = await supabase
                .from("travel_request")
                .update({ status: "rejected" })
                .eq("id", id);
                
            if (error) throw error;
                
            // Actualizar la lista local
            setRequests(requests.filter((request) => request.id !== id));
        } catch (err) {
            console.error("Error rejecting request:", err);
            alert("No se pudo rechazar la solicitud");
        }
    };

    const handleCancel = () => {
        // Redirigir a la página principal
        window.location.href = "/customer/main_view";
    };

    const handleViewDetails = (request: TripRequest) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleSubmitOffer = async (newPrice: number) => {
        if (selectedRequest) {
            try {
                // Actualizar el precio en Supabase
                const { error } = await supabase
                    .from("travel_request")
                    .update({ price: newPrice })
                    .eq("id", selectedRequest.id);
                
                if (error) throw error;
                
                // Actualizar la UI
                setRequests(
                    requests.map((req) =>
                        req.id === selectedRequest.id
                            ? { ...req, price: newPrice }
                            : req
                    )
                );
                
                setIsModalOpen(false);
            } catch (err) {
                console.error("Error updating price:", err);
                alert("No se pudo actualizar el precio");
            }
        }
    };

    // Para propósitos de depuración
    useEffect(() => {
        console.log("Supabase client:", supabase ? "Disponible" : "No disponible");
    }, []);

    return (
        <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
            <header className="flex items-center justify-center p-4 bg-white">
                <h1 className="text-center text-lg font-medium text-gray-800">
                    Solicitudes de Viaje
                </h1>
                <div className="w-8"></div> {/* Spacer for alignment */}
            </header>

            <div className="flex-1 p-4 overflow-auto space-y-4">
                {loading ? (
                    <div className="text-center py-8">Cargando solicitudes...</div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">
                        <p>{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Reintentar
                        </button>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="text-center py-8">No hay solicitudes disponibles</div>
                ) : (
                    requests.map((request) => (
                        <TripRequestCard
                            key={request.id}
                            request={request}
                            onAccept={() => handleAccept(request.id)}
                            onReject={() => handleReject(request.id)}
                            onViewDetails={() => handleViewDetails(request)}
                        />
                    ))
                )}
            </div>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleCancel}
                    className="w-full py-3 bg-red-500 text-white rounded-md font-medium"
                >
                    Regresar
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