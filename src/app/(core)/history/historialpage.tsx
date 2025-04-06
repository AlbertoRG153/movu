"use client"

import Link from "next/link"



interface TripRecord {
  id: number
  date: string
  time: string
  amount: string
  origin: string
  destination: string
}

 export const tripHistory: TripRecord[] = [
  {
    id: 1,
    date: "7 feb",
    time: "13:22",
    amount: "L 1500.00",
    origin: "Blvd. Morazan",
    destination: "Res. Altos del trapiche",
  },
  {
    id: 2,
    date: "20 feb",
    time: "13:22",
    amount: "L 2000.00",
    origin: "Blvd. Morazan",
    destination: "Res. Altos del trapiche",
  },
  {
    id: 3,
    date: "10 mar",
    time: "13:22",
    amount: "L 1200.00",
    origin: "Blvd. Morazan",
    destination: "Res. Altos del trapiche",
  },
  {
    id: 4,
    date: "10 mar",
    time: "13:22",
    amount: "L 1200.00",
    origin: "Blvd. Morazan",
    destination: "Res. Altos del trapiche",
  },
  {
    id: 5,
    date: "10 mar",
    time: "13:22",
    amount: "L 1200.00",
    origin: "Blvd. Morazan",
    destination: "Res. Altos del trapiche",
  },
]

export default function HistorialClient() {
  return (
    <div className="flex h-full  bg-[#0c2d40]">
      {/* Lista de historial */}
      <div className="w-full  px-18">
        <div className="flex items-center p-4 bg-[#0c2d40] ">
          <h1 className="text-xl font-medium text-white">Mi historial de viajes</h1>
        </div>

        <div className="divide-y divide-gray-800">
        {tripHistory.map((trip) => (
  <Link key={trip.id} href={`/history/${trip.id}`}>
    <div
      key={trip.id}
      className="group p-4 px-2 bg-[#0c2d40] cursor-pointer rounded-xl transition-all duration-300 ease-in-out hover:bg-[#083344] hover:shadow-md hover:scale-[1.02]"
    >
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2 text-white">
          <span className="font-medium">{trip.date},</span>
          <span>{trip.time}</span>
        </div>
        <span className="font-medium text-white">{trip.amount}</span>
      </div>

      <div className="flex flex-col gap-1 text-gray-300">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
          </div>
          <span>{trip.origin}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border border-gray-300 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
          </div>
          <span>{trip.destination}</span>
        </div>
      </div>
    </div>
  </Link>
))}

        </div>
      </div>

      {/* Panel derecho con detalles */}
      
    </div>
  )
}

