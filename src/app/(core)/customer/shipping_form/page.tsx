import ShippingForm from "@/components/customer/shipping_form";

export default function ShippingFormPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <ShippingForm />
            </div>
        </main>
    );
}
