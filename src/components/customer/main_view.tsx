import Link from "next/link";
import Image from "next/image";

export function MainView() {
    return (
        <>
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm bg-white shadow-lg inset-shadow-sm rounded-2xl p-4 flex flex-col items-center">
                <Link href="/customer/shipping_form">
                    <div className="w-12 h-12">
                        <Image
                            src="/camion.png"
                            alt="Camión"
                            width={50}
                            height={50}
                        />
                    </div>

                    <div className="text-center">
                        <span className="mt-2 text-gray-700 font-large text-xl">
                            Flete
                        </span>
                    </div>
                </Link>
            </div>
        </>
    );
}
