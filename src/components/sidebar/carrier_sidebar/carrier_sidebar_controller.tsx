"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import {  CarrierSidebar } from "./carrier_sidebar"

export function CarrierSidebarController() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 p-2 rounded-md bg-[#0d2a33] text-white"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      < CarrierSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Overlay to close sidebar when clicking outside como meter imagenes de  */}
      {isSidebarOpen && <div className="fixed inset-0 z-40" onClick={closeSidebar} />}
    </>
  )
}