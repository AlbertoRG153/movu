"use client";
<<<<<<< HEAD
import {  Building, Calendar, FileLock, Mail, Transgender, User2Icon} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import  Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import dayjs from "dayjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import "dayjs/locale/es";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
=======
import { useEffect, useState } from "react";
import { Building, Calendar, FileLock, Mail, Transgender, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/lib/supabase/supabaseClient";

>>>>>>> Eduardo
export function RegisterUserForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
<<<<<<< HEAD
  const [genero, setGenero] = useState("");
  const [fecha, setFecha] = useState(dayjs());
  const [open, setOpen] = useState(false);
=======
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    first_surname: "",
    second_surname: "",
    dni: "",
    email: "",
    password: "",
    birthdate: "",
    genre: "",
    id_city: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchCities() {
      const { data, error } = await supabase.from("city").select("id, name");
      if (error) {
        console.error("Error al obtener ciudades:", error.message);
      } else {
        setCities(data);
      }
    }
    fetchCities();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    //ver que no haya campos vacios
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        setErrorMessage("Todos los campos son obligatorios.");
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.from("person").insert([formData]);

    if (error) {
      setErrorMessage("Error al registrar usuario: " + error.message);
    } else {
      alert("Usuario registrado con éxito");
      setFormData({
        first_name: "",
        second_name: "",
        first_surname: "",
        second_surname: "",
        dni: "",
        email: "",
        password: "",
        birthdate: "",
        genre: "",
        id_city: "",
      });
    }

    setLoading(false);
  };

>>>>>>> Eduardo
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex justify-center">
            <Image src="/image.svg" alt="Logo" width={125} height={125} layout="fixed" />
          </div>
          <CardTitle className="text-2xl text-center text-[#0a2540]">Registro Cliente</CardTitle>
        </CardHeader>
        <CardContent>
<<<<<<< HEAD
          <form>
            <div className="flex flex-col gap-2 py-2">
                <Label htmlFor="" >   <User2Icon  size={15}/> Primer Nombre</Label>
                <Input 
                  id="firstName"
                  type="text"
                  placeholder=" "
                  required
                />
              </div>

              <div className="flex flex-col gap-2 py-2">
                <Label htmlFor=""  > <User2Icon size={15}/> Segundo Nombre</Label>
                <Input
                  id="secondName"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Label htmlFor="" > <User2Icon size={15}/> Primer Apellido</Label>
                <Input
                  id=""
                  type="text"
                  placeholder=" "
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2 py-2 ">
                <Label htmlFor=""  > <User2Icon  size={15}/> Segundo Apellido</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="  "
                  required
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Label htmlFor=""  ><Mail size={15}/> Correo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Label htmlFor=""><FileLock size={15}/> Contrasena</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder=""
                  required
                />
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Label htmlFor=""> <Calendar  size={15}/> Fecha de nacimiento</Label>  
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {fecha ? fecha.format("DD/MM/YYYY") : "Selecciona una fecha"}
          </Button>
        </DialogTrigger>
        <DialogContent className="p-4 w-fit">
          <DateCalendar
            value={fecha}
            onChange={(newValue) => {
              setFecha(newValue);
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
              </div>

              <div className="flex flex-col gap-2 py-2">
                <Label htmlFor=""> <Transgender  size={17}/> Genero
                </Label>
                <Select value={genero} onValueChange={setGenero}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona tu género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <Label htmlFor="">  <Building  size={15}/> Ciudad </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder=""
                  required
                />
=======
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Campos del formulario */}
              <div className="grid gap-2">
                <Label><User2Icon size={15} /> Primer Nombre</Label>
                <Input id="first_name" type="text" value={formData.first_name} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label><User2Icon size={15} /> Segundo Nombre</Label>
                <Input id="second_name" type="text" value={formData.second_name} onChange={handleChange} />
              </div>

              <div className="grid gap-2">
                <Label><User2Icon size={15} /> Primer Apellido</Label>
                <Input id="first_surname" type="text" value={formData.first_surname} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label><User2Icon size={15} /> Segundo Apellido</Label>
                <Input id="second_surname" type="text" value={formData.second_surname} onChange={handleChange} />
              </div>

              <div className="grid gap-2">
                <Label><User2Icon size={15} /> DNI</Label>
                <Input id="dni" type="text" value={formData.dni} onChange={handleChange} />
              </div>

              <div className="grid gap-2">
                <Label><Mail size={15} /> Correo</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label><FileLock size={15} /> Contraseña</Label>
                <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="grid gap-2">
                <Label><Calendar size={15} /> Fecha de nacimiento</Label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Selecciona tu fecha"
                      onChange={(date) => setFormData({ ...formData, birthdate: date?.format("YYYY-MM-DD") || "" })}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div className="grid gap-2">
                <Label><Transgender size={15} /> Género</Label>
                <Input id="genre" type="text" value={formData.genre} onChange={handleChange} required />
>>>>>>> Eduardo
              </div>

              <div className="grid gap-2">
                <Label><Building size={15} /> Ciudad</Label>
                <select id="id_city" className="border border-gray-300 rounded-md px-3 py-2" value={formData.id_city} onChange={handleChange} required>
                  <option value="">Selecciona una ciudad</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>

              {/* Mensaje de error */}
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

              {/* Botón de registro */}
              <div className="mt-4 text-center">
                <Button type="submit" className="w-full py-6 bg-emerald-400 hover:bg-emerald-500 text-white" disabled={loading}>
                  {loading ? "Registrando..." : "Registrar"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}