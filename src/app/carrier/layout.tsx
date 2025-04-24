import { CarrierSidebarController } from "@/components/sidebar/carrier_sidebar/carrier_sidebar_controller";
import { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <CarrierSidebarController />
            {children}
        </>
    );
}
