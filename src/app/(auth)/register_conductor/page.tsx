import { RegisterUserConductor } from "@/components/autenticacion/register_user_carrier";

const page = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterUserConductor />
            </div>
        </div>
    );
};

export default page;
