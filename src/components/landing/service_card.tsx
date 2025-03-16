import type { ReactNode } from "react"

interface ServiceCardProps {
  title: string
  icon: ReactNode
  description: string
}

export function ServiceCard({ title, icon, description }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 p-4 rounded-full bg-[#0a3050] inline-flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

