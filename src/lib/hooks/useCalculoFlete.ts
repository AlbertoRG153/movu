import { useState } from "react";

interface CalculoFleteProps {
  distancia: number;
  peso?: number;  // Opcional si se elige calcular por volumen
  volumen?: number; // Opcional si se elige calcular por peso
  tipoVehiculo: string;
  metodo: "peso" | "volumen"; //para elegir el método
}

const useCalculoFlete = () => {
  const [precio, setPrecio] = useState(0);

  const calcularPrecio = ({ distancia, peso, volumen, tipoVehiculo, metodo }: CalculoFleteProps) => {
    const tarifas: Record<string, { base: number; km: number; kg?: number; m3?: number }> = {//esto segun la tabla
      pickup: { base: 500, km: 10, kg: 2, m3: 5 },
      camion_pequeno: { base: 700, km: 12, kg: 2.5, m3: 6 },
      camion_mediano: { base: 900, km: 14, kg: 3, m3: 7 },
      camion_grande: { base: 1200, km: 18, kg: 3.5, m3: 8 },
      volqueta: { base: 1100, km: 16, kg: 3.2, m3: 7.5 },
      camion_carga_mediano: { base: 1500, km: 20, kg: 4, m3: 9 },
      camion_carga_grande: { base: 2000, km: 25, kg: 5, m3: 10 },
    };

    if (!tarifas[tipoVehiculo]) return;

    const { base, km, kg, m3 } = tarifas[tipoVehiculo];

    let precioFinal = base + distancia * km;

    // Usar solo peso o volumen según el método seleccionado
    if (metodo === "peso" && kg && peso) {
      precioFinal += peso * kg;
    } else if (metodo === "volumen" && m3 && volumen) {
      precioFinal += volumen * m3;
    }

    setPrecio(precioFinal);
  };

  return { precio, calcularPrecio };
};

export default useCalculoFlete;