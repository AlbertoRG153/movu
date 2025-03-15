
import { CalendarIcon, User2Icon} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
          <CardTitle className="text-2xl">Iniciar Secion </CardTitle>
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
                  placeholder="Nombre de usuario o numero de celular"
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
                  placeholder="Nombre de usuario o numero de celular"
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
                  placeholder="Nombre de usuario o numero de celular"
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
                  placeholder="Nombre de usuario o numero de celular"
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
                  placeholder="Nombre de usuario o numero de celular"
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
                  placeholder="Nombre de usuario o numero de celular"
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
                  placeholder="Nombre de usuario o numero de celular"
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
                  placeholder="Nombre de usuario o numero de celular"
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
                  placeholder="Nombre de usuario o numero de celular"
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