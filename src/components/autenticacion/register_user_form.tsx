
import {  User2Icon} from "lucide-react"
import { cn } from "@/lib/utils"
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
          <CardTitle className="text-2xl">Registro Cliente </CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""  > <User2Icon/></Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder=" Username"
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="1Nombre "
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="2Nombre"
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=" 1 apellido"
                  required
                />
              </div>
              </div>
              
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=" 2 Apedillos "
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo "
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Contrasena"
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=" Fecha de nacimiento"
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Genero"
                  required
                />
              </div>
              </div>
              <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor=""></Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Cuidad"
                  required
                />
              </div>
              </div>
             
             
              
              
              

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}