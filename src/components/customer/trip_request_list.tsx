"use client";

import { useEffect, useState } from "react";
import TripRequestCard from "./trip_request_card";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useSearchParams } from "next/navigation"; // Import to get URL parameters

interface TripRequest {
  id: string;
  name: string;
  price: number;
  plate: string;
  rating: number;
  reviews: number;
}

export default function TripRequestList() {
  const [requests, setRequests] = useState<TripRequest[]>([]);
  const searchParams = useSearchParams();
  const travelRequestId = searchParams.get('travelRequestId'); // Get travel request ID from URL

  useEffect(() => {
    const fetchRequests = async () => {
      if (!travelRequestId) {
        console.error("No travel request ID provided");
        return;
      }

      // Fetch only trip requests for the specific travel request
      const { data: tripRequests, error: tripError } = await supabase
        .from("trip_request")
        .select(`
          id,
          newPrice,
          id_carrier (
            id,
            id_person (
              first_name,
              first_surname,
              profile_img
            ),
            vehicle:id_vehicle (
              plate_number
            )
          )
        `)
        .eq('id_travel_request', travelRequestId); // Filter by travel request ID

      if (tripError) {
        console.error("Error fetching trip requests:", JSON.stringify(tripError, null, 2));
        return;
      }

      console.log("Fetched trip requests:", tripRequests);

      // Procesamos cada solicitud para obtener las calificaciones
      const requestsWithRatings = await Promise.all(
        tripRequests.map(async (item: any) => {
          // Obtener calificaciones para este transportista
          const { data: ratings, error: ratingError } = await supabase
            .from("rating")
            .select("score_carrier")
            .eq("id_trip.id_carrier", item.id_carrier.id);

          if (ratingError) {
            console.error("Error fetching ratings:", JSON.stringify(ratingError, null, 2));
            return {
              id: item.id,
              price: item.newPrice,
              name: `${item.id_carrier.id_person.first_name} ${item.id_carrier.id_person.first_surname}`,
              plate: item.id_carrier.vehicle.plate_number,
              rating: 0, // Valor predeterminado si hay error
              reviews: 0, // Valor predeterminado si hay error
            };
          }

          // Calcular promedio de calificaciones
          let avgRating = 0;
          if (ratings && ratings.length > 0) {
            const validRatings = ratings.filter(r => r.score_carrier !== null);
            const total = validRatings.reduce((sum, r) => sum + Number(r.score_carrier), 0);
            avgRating = validRatings.length > 0 ? total / validRatings.length : 0;
          }

          return {
            id: item.id,
            price: item.newPrice,
            name: `${item.id_carrier.id_person.first_name} ${item.id_carrier.id_person.first_surname}`,
            plate: item.id_carrier.vehicle.plate_number,
            rating: avgRating,
            reviews: ratings ? ratings.length : 0,
          };
        })
      );

      setRequests(requestsWithRatings);
    };

    fetchRequests();
  }, [travelRequestId]);

  const handleAccept = async (id: string) => {
    // Update the trip_request to mark it as accepted
    const { error } = await supabase
      .from("trip_request")
      .update({ acepto: true })
      .eq('id', id);
    
    if (error) {
      console.error("Error accepting trip request:", error);
      return;
    }

    // Remove the accepted request from the list
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCancel = () => {
    console.log("Cancelled");
    // Add navigation back or other cancel logic
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col">
      <header className="flex items-center justify-center p-4 bg-white">
        <h1 className="text-center text-lg font-medium text-gray-800">
          Solicitud de Viaje
        </h1>
        <div className="w-8"></div>
      </header>

      <div className="flex-1 p-4 overflow-auto space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <TripRequestCard
              key={request.id}
              request={request}
              onAccept={() => handleAccept(request.id)}
              onReject={() => handleReject(request.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No hay solicitudes de conductores para este viaje
          </p>
        )}
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