import { SidebarController } from "@/components/sidebar/sidebar_controller";
import { ReactNode } from "react";
import "../globals.css";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {" "}
            <SidebarController />
            {children}
        </>
    );
}
