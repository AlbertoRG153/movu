import { LoginConductor } from "@/components/autenticacion/login_conductor";

const Page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginConductor />
      </div>
    </div>
  )
}

 export default Page;
