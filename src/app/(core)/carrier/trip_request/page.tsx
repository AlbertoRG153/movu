import TripRequestList from "@/components/carrier/trip_request_list";

export default function TripRequestsPage() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center bg-cover bg-center">
                <TripRequestList />
            </main>
        </>
    );
}
