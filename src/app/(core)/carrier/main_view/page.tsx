"use client";

import React, { useEffect, useState } from "react";
import { MainView } from "@/components/carrier/main_view";
import { MainViewPeding } from "@/components/carrier/main_view_pending";
import { MainViewNoCarrier } from "@/components/carrier/main_view_no_carrier";
import { supabase } from "@/lib/supabase/supabaseClient";

const MainViewPage = () => {
  const [status, setStatus] = useState<"loading" | "noCarrier" | "pending" | "approved">("loading");

  useEffect(() => {
    const fetchPersonStatus = async () => {
      const localUser = localStorage.getItem("main_view");
      if (!localUser) {
        setStatus("noCarrier");
        return;
      }

      const { userId } = JSON.parse(localUser);

      const { data, error } = await supabase
        .from("person")
        .select("verification_carrier, approved_carrier")
        .eq("id", userId)
        .single();

      if (error || !data) {
        console.error("Error al obtener estado del usuario:", error);
        setStatus("noCarrier");
        return;
      }

      const { verification_carrier, approved_carrier } = data;

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
      {status === "approved" && <MainView />}
      {status === "pending" && <MainViewPeding />}
      {status === "noCarrier" && <MainViewNoCarrier />}
    </div>
  );
};

export default MainViewPage;
