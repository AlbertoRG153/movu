"use client";
import { useEffect, useState } from "react";
import {
    Building,
    Calendar,
    FileLock,
    Mail,
    Transgender,
    User2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";

export function RegisterUserConductor({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
    const [formData, setFormData] = useState({
        first_name: "",
        second_name: "",
        first_surname: "",
        second_surname: "",
        dni: "",
        email: "",
        password: "",
        birthdate: "",
        genre: "",
        id_city: "",
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter(); // Para redireccionar después del registro

    useEffect(() => {
        async function fetchCities() {
            const { data, error } = await supabase
                .from("city")
                .select("id, name");
            if (error) {
                console.error("Error al obtener ciudades:", error.message);
            } else {
                setCities(data);
            }
        }
        fetchCities();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
    
        // Verificar campos vacíos
        for (const key in formData) {
            if (!formData[key as keyof typeof formData]) {
                setErrorMessage("Todos los campos son obligatorios.");
                setLoading(false);
                return;
            }
        }
    
        try {
            const { data: hashedPassword, error: hashError } = await supabase.rpc(
                'hash_password',
                { password: formData.password }
            );
        
            if (hashError) {
                throw hashError;
            }
        
            const secureFormData = {
                ...formData,
                password: hashedPassword
            };
        
            const { data: insertedPerson, error } = await supabase
    .from("person")
    .insert([secureFormData])
    .select("id") // Pedimos que retorne el ID

if (error) {
    throw error;
}

const personId = insertedPerson?.[0]?.id;

if (!personId) {
    throw new Error("No se pudo obtener el ID del nuevo usuario");
}

localStorage.setItem("person_id", personId); // Guardamos el ID, no el DNI
alert("Conductor registrado con exito");
router.push("/carrier_register/information"); 
        
            setFormData({
                first_name: "",
                second_name: "",
                first_surname: "",
                second_surname: "",
                dni: "",
                email: "",
                password: "",
                birthdate: "",
                genre: "",
                id_city: "",
            });
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido";
            setErrorMessage("Error al registrar usuario: " + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <div className="flex justify-center">
                        <Image
                            src="/Logo_movu_solido_2.png"
                            alt="Logo"
                            width={125}
                            height={125}
                            layout="fixed"
                        />
                    </div>
                    <CardTitle className="text-2xl text-center text-[#0a2540]">
                        Registro Conductor
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            {/* Campos del formulario */}
                            <div className="grid gap-2">
                                <Label>
                                    <User2Icon size={15} /> Primer Nombre
                                </Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <User2Icon size={15} /> Segundo Nombre
                                </Label>
                                <Input
                                    id="second_name"
                                    type="text"
                                    value={formData.second_name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <User2Icon size={15} /> Primer Apellido
                                </Label>
                                <Input
                                    id="first_surname"
                                    type="text"
                                    value={formData.first_surname}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <User2Icon size={15} /> Segundo Apellido
                                </Label>
                                <Input
                                    id="second_surname"
                                    type="text"
                                    value={formData.second_surname}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <User2Icon size={15} /> DNI
                                </Label>
                                <Input
                                    id="dni"
                                    type="text"
                                    value={formData.dni}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <Mail size={15} /> Correo
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <FileLock size={15} /> Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <Calendar size={15} /> Fecha de nacimiento
                                </Label>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            label="Selecciona tu fecha"
                                            onChange={(date) =>
                                                setFormData({
                                                    ...formData,
                                                    birthdate:
                                                        date?.format(
                                                            "YYYY-MM-DD"
                                                        ) || "",
                                                })
                                            }
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <Transgender size={15} /> Género
                                </Label>
                                <Input
                                    id="genre"
                                    type="text"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <Building size={15} /> Ciudad
                                </Label>
                                <select
                                    id="id_city"
                                    className="border border-gray-300 rounded-md px-3 py-2"
                                    value={formData.id_city}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Selecciona una ciudad
                                    </option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Mensaje de error */}
                            {errorMessage && (
                                <p className="text-red-500 text-sm">
                                    {errorMessage}
                                </p>
                            )}

                            {/* Botón de registro */}
                            <div className="mt-4 text-center">
                                <Button
                                    type="submit"
                                    className="w-full py-6 bg-emerald-400 hover:bg-emerald-500 text-white"
                                    disabled={loading}
                                >
                                    {loading ? "Registrando..." : "Registrar"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}