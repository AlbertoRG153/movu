"use client";
import {  Building, Calendar, FileLock, Mail, Transgender, User2Icon} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import  Image from "next/image"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export function RegisterUserForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
            <div className="flex flex-col gap-6 ">
              <div className="grid gap-2">
                <Label htmlFor="" >   <User2Icon  size={15}/> Primer Nombre</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder=" "
                  required
                />
              </div>
              </div>

              <div className="flex flex-col gap-6 my-5">
              <div className="grid gap-2">
                <Label htmlFor=""  > <User2Icon size={15}/> Segundo Nombre</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="" > <User2Icon size={15}/> Primer Apellido</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=" "
                  required
                />
              </div>
              </div>
              
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""  > <User2Icon  size={15}/> Segundo Apellido</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="  "
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""  ><Mail size={15}/> Correo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""><FileLock size={15}/> Contrasena</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              </div>

              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""> <Calendar  size={15}/> Fecha de nacimiento</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=" "
                  required
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Basic date picker" />
              </DemoContainer>
            </LocalizationProvider> 
              </div>
              </div>

              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""> <Transgender  size={15}/> Genero</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="">  <Building  size={15}/> Ciudad </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
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