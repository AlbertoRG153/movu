"use client";

import React, { useEffect, useState } from "react";
import { MainView } from "@/components/carrier/main_view";
import { MainViewPeding } from "@/components/carrier/main_view_pending";
import { MainViewNoCarrier } from "@/components/carrier/main_view_no_carrier";
import { supabase } from "@/lib/supabase/supabaseClient";

// Define la interfaz de usuario
interface User {
  first_name: string;
  first_surname: string;
}

const MainViewPage = () => {
  const [status, setStatus] = useState<"loading" | "noCarrier" | "pending" | "approved">("loading");
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchPersonStatus = async () => {
      const localUser = localStorage.getItem("main_view");
      if (!localUser) {
        setStatus("noCarrier");
        return;
      }

      const { userId } = JSON.parse(localUser);

      // Modificamos la consulta para incluir también el nombre y apellido
      const { data, error } = await supabase
        .from("person")
        .select("verification_carrier, approved_carrier, first_name, first_surname")
        .eq("id", userId)
        .single();

      if (error || !data) {
        console.error("Error al obtener estado del usuario:", error);
        setStatus("noCarrier");
        return;
      }

      const { verification_carrier, approved_carrier, first_name, first_surname } = data;

      // Guardamos los datos del usuario
      setUserData({
        first_name,
        first_surname
      });

      // Determinamos el estado como antes
      if (!verification_carrier && !approved_carrier) {
        setStatus("noCarrier");
      } else if (verification_carrier && !approved_carrier) {
        setStatus("pending");
      } else if (verification_carrier && approved_carrier) {
        setStatus("approved");
      } else {
        setStatus("noCarrier");
      }
    };

    fetchPersonStatus();
  }, []);

  return (
    <div className="min-h-screen bg-[#092A39]/95">
      {status === "loading" && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-white text-xl">Cargando...</p>
        </div>
      )}
      {status === "approved" && <MainView user={userData} />}
      {status === "pending" && <MainViewPeding />}
      {status === "noCarrier" && <MainViewNoCarrier />}
    </div>
  );
};

export default MainViewPage;