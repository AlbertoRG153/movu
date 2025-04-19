import PaymentGateway from "@/components/customer/payment_gateway";

export default function PaymentGatewayPage() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center bg-[url('/map-background.png')] bg-cover bg-center">
                <PaymentGateway />
            </main>
        </>
    );
}
