"use client";
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
export function RegisterUserForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [genero, setGenero] = useState("");
  const [fecha, setFecha] = useState(dayjs());
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <div  className="flex justify-center">
          <Image 
          src="/image.svg"
          alt="Logo"
          width={125}
          height={125}
          layout="fixed"
          />
          </div>

          <CardTitle className="text-2xl text-center text-[#0a2540]">Registro Cliente </CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              </div>

            <div className="mt-4 text-center text-sm">
              <Button type="submit" className="w-full py-6 bg-emerald-400
                hover:bg-emerald-500 text-white">
                Registrar
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}