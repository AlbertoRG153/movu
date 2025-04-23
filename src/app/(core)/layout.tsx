"use client";

import { SidebarController } from "@/components/sidebar/sidebar_controller";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "../globals.css";

export default function Layout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // Verificar si la ruta comienza con alguno de estos patrones
    //revisar esto ya que tiene cambios (pendiente)
    const routePatternsWithoutSidebar = [
        "/customer/profile/settings",
        "/customer/profile/cities",
        "/carrier_register/information",
        "/carrier_register/vehicle_information",
        "/carrier/profile/settings",
        "/carrier/profile/cities",
        "/carrier_register/driver_license",
        "/register_conductor/information",
        "/register_conductor/driver_license",
        "/register_conductor/vehicle_information",
    ];

    const shouldShowSidebar = !routePatternsWithoutSidebar.some((pattern) =>
        pathname.startsWith(pattern)
    );

    return (
        <>
            {shouldShowSidebar && <SidebarController />}
            {children}
        </>
    );
}
