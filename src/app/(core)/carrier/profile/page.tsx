"use client";

import { useEffect, useState } from "react";
import { HeaderCustomerCarrier } from "@/components/customer_carrier/header_customer_carrier";
import { ProfileCarrier } from "@/components/carrier/profile_carrier";
import { PendingVerificationCarrier } from "@/components/carrier/peding_verification_carrier";
import { ProfileCustomer } from "@/components/customer/profile_customer";
import { supabase } from "@/lib/supabase/supabaseClient";

type PersonStatus = {
  approved_carrier: boolean;
  verification_carrier: boolean;
};

const ProfileCarrierPage = () => {
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
    if (personStatus.approved_carrier && personStatus.verification_carrier) {
      ComponentToRender = <ProfileCarrier />;
    } else if (!personStatus.approved_carrier && personStatus.verification_carrier) {
      ComponentToRender = <PendingVerificationCarrier />;
    } else {
      ComponentToRender = <ProfileCustomer />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header siempre visible */}
      <HeaderCustomerCarrier />

      {/* Fondo mientras se carga o componente correspondiente */}
      <div className={`flex-1 w-full ${loading ? "bg-[#092A39]/90" : ""}`}>
        {ComponentToRender}
      </div>
    </div>
  );
};

export default ProfileCarrierPage;
