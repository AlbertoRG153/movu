"use client";
import { useEffect, useState, ChangeEvent } from "react";
import {
    Building,
    Calendar,
    Lock,
    Mail,
    Transgender,
    User2Icon,
    CircleHelp,
    Eye,
    EyeOff,
    IdCard,
    Phone,
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
import { Alert, Snackbar } from "@mui/material";
import dayjs from "dayjs";

export function RegisterUserForm({
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
        phone: "",
    });

    const [countryCode, setCountryCode] = useState(""); // Agrega un estado separado para el código de país
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para mostrar/ocultar contraseña
    const router = useRouter();

    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState("");

    type PasswordStrength = "Nada segura" | "Segura" | "Muy segura";

    const getPasswordStrength = (pwd: string): PasswordStrength => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/\d/.test(pwd)) score++;
        if (/[@¿?=()\/&%$·"!\-+*._]/.test(pwd)) score++;

        if (score <= 2) return "Nada segura";
        if (score <= 4) return "Segura";
        return "Muy segura";
    };

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

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setFormData({ ...formData, password: newPassword });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Verificar campos vacíos
        for (const key in formData) {
            if (
                key !== "second_name" &&
                key !== "second_surname" &&
                !formData[key as keyof typeof formData]
            ) {
                setAlertMessage("Todos los campos son obligatorios.");
                setAlertType("error");
                setOpenAlert(true);
                setLoading(false);
                return;
            }
        }

        // Verificar si el DNI, teléfono o email ya existen
        try {
            const { data: existingDni } = await supabase
                .from("person")
                .select("dni")
                .eq("dni", formData.dni)
                .maybeSingle();

            const { data: existingPhone } = await supabase
                .from("person")
                .select("phone")
                .eq("phone", `${countryCode}${formData.phone}`)
                .maybeSingle();

            const { data: existingEmail } = await supabase
                .from("person")
                .select("email")
                .eq("email", formData.email)
                .maybeSingle();

            // Verificar si ya existen registros con el DNI, teléfono o email
            if (existingDni) {
                setAlertMessage("El DNI ya está registrado.");
                setAlertType("error");
                setOpenAlert(true);
                setLoading(false);
                return;
            }

            if (existingPhone) {
                setAlertMessage("El número de teléfono ya está registrado.");
                setAlertType("error");
                setOpenAlert(true);
                setLoading(false);
                return;
            }

            if (existingEmail) {
                setAlertMessage("El correo electrónico ya está registrado.");
                setAlertType("error");
                setOpenAlert(true);
                setLoading(false);
                return;
            }

            // Si llegamos aquí, es porque no existen conflictos, continuamos con el registro
            const { data: hashedPassword, error: hashError } =
                await supabase.rpc("hash_password", {
                    password: formData.password,
                });

            if (hashError) {
                throw hashError;
            }

            // Concatenar código de país y número de teléfono
            const fullPhone = `${countryCode}${formData.phone}`;

            // Crear un nuevo objeto con la contraseña encriptada y el teléfono concatenado
            const secureFormData = {
                ...formData,
                phone: fullPhone, // Guardamos el teléfono concatenado
                password: hashedPassword,
                second_name: formData.second_name || null,
                second_surname: formData.second_surname || null,
                verification_carrier: false,
                approved_carrier: false,
            };

            const { error } = await supabase
                .from("person")
                .insert([secureFormData]);

            if (error) {
                throw error;
            }

            // Mostrar el Snackbar de éxito
            setAlertMessage("Usuario registrado con éxito");
            setAlertType("success");
            setOpenAlert(true);

            // Limpiar el formulario
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
                phone: "",
            });
            setCountryCode(""); // Limpiar el código de país

            // Redirigir al login después de un registro exitoso
            setTimeout(() => {
                router.push("/login");
            }, 500);
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Error desconocido";
            setAlertMessage("Error al registrar usuario: " + errorMessage);
            setAlertType("error");
            setOpenAlert(true);
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (pwd: string): string[] => {
        const issues: string[] = [];

        if (pwd.length < 8) {
            issues.push("Debe tener al menos 8 caracteres");
        }
        if (!/[A-Z]/.test(pwd)) {
            issues.push("Debe contener al menos una letra mayúscula");
        }
        if (!/[a-z]/.test(pwd)) {
            issues.push("Debe contener al menos una letra minúscula");
        }
        if (!/\d/.test(pwd)) {
            issues.push("Debe contener al menos un número");
        }
        if (!/[@¿?=()\/&%$·\"!\-+*._]/.test(pwd)) {
            issues.push(
                'Debe contener al menos un carácter especial (@¿?=()/&% $·"!-+*._)'
            );
        }

        return issues;
    };

    const passwordIssues = validatePassword(formData.password);
    const [dniError, setDniError] = useState("");

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <div className="flex justify-center">
                        <Image
                            src="/Logo_movu.png"
                            alt="Logo"
                            width={125}
                            height={125}
                            layout="fixed"
                            onClick={() => router.push("/login")}
                        />
                    </div>

                    <CardTitle className="text-2xl text-center text-[#0a2540]">
                        Registro Cliente
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
                                    <IdCard size={15} /> DNI
                                </Label>
                                <Input
                                    id="dni"
                                    type="text"
                                    maxLength={13}
                                    value={formData.dni}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,13}$/.test(value)) {
                                            setFormData({
                                                ...formData,
                                                dni: value,
                                            });
                                            setDniError(""); // Limpiar error si está escribiendo bien
                                        }
                                    }}
                                    onBlur={() => {
                                        if (formData.dni.length !== 13) {
                                            setDniError(
                                                "El DNI debe tener exactamente 13 dígitos."
                                            );
                                            setTimeout(() => {
                                                setDniError("");
                                            }, 3000);
                                        } else {
                                            setDniError("");
                                        }
                                    }}
                                />
                                {dniError && (
                                    <p className="text-red-500 text-sm">
                                        {dniError}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label>
                                    <Phone size={15} /> Teléfono
                                </Label>
                                <div className="flex gap-2">
                                    <select
                                        id="countryCode"
                                        value={countryCode} // Aquí usamos el estado separado para countryCode
                                        onChange={(e) =>
                                            setCountryCode(e.target.value)
                                        } // Actualizamos solo el código de país
                                        className="border rounded-md px-2 py-1 w-3/7"
                                    >
                                        <option value=""> </option>
                                        <option value="+504">
                                            +504 Honduras
                                        </option>
                                        {/* Otros países */}
                                    </select>

                                    <Input
                                        id="phone"
                                        type="text"
                                        maxLength={8}
                                        value={formData.phone}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setFormData({
                                                    ...formData,
                                                    phone: value,
                                                });
                                            }
                                        }}
                                        placeholder="Número"
                                        required
                                    />
                                </div>
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

                            {/* Contraseña */}
                            <div className="grid gap-2 relative">
                                <Label>
                                    <Lock size={15} /> Contraseña
                                    <CircleHelp
                                        size={16}
                                        className="absolute right-3 top-1/6 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                        onClick={() =>
                                            setShowTooltip(!showTooltip)
                                        }
                                    />
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        } // Cambiar tipo de campo
                                        value={formData.password}
                                        onChange={handleChangePassword} // Usar handleChangePassword
                                        required
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        } // Alternar el estado
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}{" "}
                                        {/* Mostrar el icono adecuado */}
                                    </button>
                                </div>

                                {showTooltip && (
                                    <div className="absolute top-0 left-0 right-0 mt-2 z-10 w-full bg-white border rounded-lg shadow-md p-4 text-sm text-gray-800">
                                        <div className="flex justify-end items-end ">
                                            <button
                                                onClick={() =>
                                                    setShowTooltip(false)
                                                }
                                                className="text-gray-500 hover:text-gray-800 "
                                            >
                                                <span className="text-xl">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        <p className="font-semibold mb-2">
                                            La contraseña debe contener:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {passwordIssues.length === 0 ? (
                                                <li className="text-green-600">
                                                    Todo en orden
                                                </li>
                                            ) : (
                                                passwordIssues.map(
                                                    (issue, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-red-500"
                                                        >
                                                            {issue}
                                                        </li>
                                                    )
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {/* Barra de seguridad */}
                            {formData.password.length > 0 && (
                                <div className="mt-2">
                                    <div className="text-sm mb-1">
                                        Seguridad:{" "}
                                        <strong>
                                            {getPasswordStrength(
                                                formData.password
                                            )}
                                        </strong>
                                    </div>
                                    <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                                        <div
                                            className={`h-full rounded transition-all duration-300 ${
                                                getPasswordStrength(
                                                    formData.password
                                                ) === "Muy segura"
                                                    ? "bg-green-500 w-full"
                                                    : getPasswordStrength(
                                                          formData.password
                                                      ) === "Segura"
                                                    ? "bg-yellow-500 w-2/3"
                                                    : "bg-red-500 w-1/3"
                                            }`}
                                        />
                                    </div>
                                </div>
                            )}
                            {/* Fecha de nacimiento */}
                            <div className="grid gap-">
                                <Label>
                                    <Calendar size={15} /> Fecha de nacimiento
                                </Label>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            label="Selecciona tu fecha"
                                            value={
                                                formData.birthdate
                                                    ? dayjs(formData.birthdate)
                                                    : null
                                            }
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

                            {/* Género */}
                            <div className="grid gap-2">
                                <Label>
                                    <Transgender size={15} /> Género
                                </Label>
                                <select
                                    id="genre"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md"
                                    required
                                >
                                    <option value="">Selecciona género</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Prefiero no decirlo">
                                        Prefiero no decirlo
                                    </option>
                                </select>
                            </div>

                            {/* Ciudad */}
                            <div className="grid gap-2">
                                <Label>
                                    <Building size={15} /> Ciudad
                                </Label>
                                <select
                                    id="id_city"
                                    value={formData.id_city}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md"
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
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertType}
                    sx={{ width: "100%" }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
