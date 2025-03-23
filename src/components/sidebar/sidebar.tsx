"use client"

import { useState } from "react"
import Link from "next/link"
import { User, MapPin, FileText, Package, HeadphonesIcon, Settings, LogOut, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Ciudad")
  const [rating] = useState(0)

  const menuItems = [
    { name: "Ciudad", icon: <MapPin size={20} /> },
    { name: "Historial de solicitudes", icon: <FileText size={20} /> },
    { name: "Entregas", icon: <Package size={20} /> },
    { name: "Soporte Técnico", icon: <HeadphonesIcon size={20} /> },
    { name: "Configuraciones", icon: <Settings size={20} /> },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-[#0d2a33] text-white transform transition-transform duration-300 ease-in-out h-full",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* User Profile */}
      <div className="flex items-center justify-between p-4 border-b border-[#1a3b45]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1a3b45] flex items-center justify-center">
            <User size={18} />
          </div>
          <div>
            <p className="font-medium">Usuario1</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                />
              ))}
              <span className="ml-1 text-xs text-gray-300">0 (0)</span>
            </div>
          </div>
        </div>
        <ChevronRight size={20} />
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            href={`/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className={cn(
              "flex items-center gap-3 p-4 hover:bg-[#1a3b45] transition-colors",
              activeItem === item.name && "bg-[#16a085]",
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#1a3b45]">
        <button
          className="flex items-center gap-3 w-full justify-center py-3"
          onClick={() => {
            // Handle logout logic here
            console.log("Logging out...")
          }}
        >
          <span>Cerrar Sesión</span>
          <LogOut size={18} />
        </button>
      </div>

      {/* Driver Mode Button */}
      <div className="p-4 bg-[#0a1f26]">
        <button className="w-full bg-[#16d6a1] text-[#0d2a33] font-medium py-3 rounded-md hover:bg-[#14c091] transition-colors">
          Modo conductor
        </button>
      </div>
    </div>
  )
}