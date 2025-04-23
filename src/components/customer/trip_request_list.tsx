"use client";

import { useEffect, useState } from "react";
import TripRequestCard from "./trip_request_card";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useSearchParams } from "next/navigation";

interface TripRequest {
  id: string;
  name: string;
  price: number;
  plate: string;
  rating: number;
  reviews: number;
}

interface TripRequestResponse {
  id: string;
  newPrice: number;
  id_carrier: {
    id: string;
    id_person: {
      first_name: string;
      first_surname: string;
      profile_img: string;
    }[];
    vehicle: {
      plate_number: string;
    }[];
  }[];
}

interface Rating {
  score_carrier: number | null;
}

export default function TripRequestList() {
  const [requests, setRequests] = useState<TripRequest[]>([]);
  const searchParams = useSearchParams();
  const travelRequestId = searchParams.get("travelRequestId");

  useEffect(() => {
    const fetchRequests = async () => {
      if (!travelRequestId) {
        console.error("No travel request ID provided");
        return;
      }

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
        .eq("id_travel_request", travelRequestId);

      if (tripError || !tripRequests) {
        console.error("Error fetching trip requests:", JSON.stringify(tripError, null, 2));
        return;
      }

      const requestsWithRatings = await Promise.all(
        (tripRequests as TripRequestResponse[]).map(async (item) => {
          const carrier = item.id_carrier && item.id_carrier[0];
          const person = carrier?.id_person ? carrier.id_person[0] : undefined;
          const vehicle = carrier?.vehicle ? carrier.vehicle[0] : undefined;

          const { data: ratings, error: ratingError } = await supabase
            .from("rating")
            .select("score_carrier")
            .eq("id_trip.id_carrier", carrier?.id);

          if (ratingError) {
            console.error("Error fetching ratings:", JSON.stringify(ratingError, null, 2));
            return {
              id: item.id,
              price: item.newPrice,
              name: `${person?.first_name ?? "N/A"} ${person?.first_surname ?? ""}`,
              plate: vehicle?.plate_number ?? "Desconocido",
              rating: 0,
              reviews: 0,
            };
          }

          const validRatings = (ratings as Rating[]).filter((r) => r.score_carrier !== null);
          const total = validRatings.reduce((sum, r) => sum + (r.score_carrier ?? 0), 0);
          const avgRating = validRatings.length > 0 ? total / validRatings.length : 0;

          return {
            id: item.id,
            price: item.newPrice,
            name: `${person?.first_name} ${person?.first_surname}`,
            plate: vehicle?.plate_number ?? "Desconocido",
            rating: avgRating,
            reviews: ratings ? ratings.length : 0,
          };
        })
      );

      setRequests(requestsWithRatings);
    };

    if (travelRequestId) {
      fetchRequests();
    }
  }, [travelRequestId]);

  const handleAccept = async (id: string) => {
    const { error } = await supabase
      .from("trip_request")
      .update({ acepto: true })
      .eq("id", id);

    if (error) {
      console.error("Error accepting trip request:", error);
      return;
    }

    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleCancel = () => {
    console.log("Cancelled");
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
