"use client";

import { useEffect, useState } from "react";
import { HeaderCustomerCarrier } from "@/components/customer_carrier/header_customer_carrier";
import { ProfileCustomer } from "@/components/customer/profile_customer";
import { PendingVerificationCustomer } from "@/components/customer/peding_verification_customer";
import { ConfirmedVerificationCustomer } from "@/components/customer/confirmed_verification_customer";
import { supabase } from "@/lib/supabase/supabaseClient";

type PersonStatus = {
  approved_carrier: boolean;
  verification_carrier: boolean;
};

const ProfileCustomerPage = () => {
  const [personStatus, setPersonStatus] = useState<PersonStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonStatus = async () => {
      const localUser = localStorage.getItem("main_view");
      if (!localUser) {
        setLoading(false);
        return;
      }

      const { userId } = JSON.parse(localUser);

      const { data, error } = await supabase
        .from("person")
        .select("approved_carrier, verification_carrier")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error al obtener datos del usuario:", error);
        setLoading(false);
        return;
      }

      setPersonStatus({
        approved_carrier: data.approved_carrier,
        verification_carrier: data.verification_carrier,
      });

      setLoading(false);
    };

    fetchPersonStatus();
  }, []);

  let ComponentToRender = null;

  if (!loading && personStatus) {
    const { verification_carrier, approved_carrier } = personStatus;

    if (!verification_carrier && !approved_carrier) {
      ComponentToRender = <ProfileCustomer />;
    } else if (verification_carrier && !approved_carrier) {
      ComponentToRender = <PendingVerificationCustomer />;
    } else if (verification_carrier && approved_carrier) {
      ComponentToRender = <ConfirmedVerificationCustomer />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header siempre visible */}
      <HeaderCustomerCarrier />

      {/* Fondo mientras carga, o contenido */}
      <div className={`flex-1 w-full ${loading ? "bg-[#092A39]/90" : ""}`}>
        {ComponentToRender}
      </div>
    </div>
  );
};

export default ProfileCustomerPage;
