import { RegisterUserForm } from "@/components/autenticacion/register_user_form"

 const page = () => {
  return (
     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
          <RegisterUserForm/>
          </div>
        </div>
   
  )
}

export default page