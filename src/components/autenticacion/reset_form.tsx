"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff} from "lucide-react";
import { Alert, Snackbar } from "@mui/material";
import { supabase } from "@/lib/supabase/supabaseClient";


export function ResetForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const nextStep = () => setStep((prev) => (prev < 3 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {step === 1 && <StepOne nextStep={nextStep} setEmail={setEmail} />}
        {step === 2 && <StepTwo nextStep={nextStep} prevStep={prevStep} email={email} />}
        {step === 3 && <StepThree prevStep={prevStep} email={email} />}      </div>
    </div>
  );
}

function StepOne({ nextStep, setEmail }: { nextStep: () => void, setEmail: (email: string) => void }) {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }
  // Función para verificar si el correo existe en la base de datos
  const handleContinue = async () => {
    if (!emailInput.trim()) {
      setErrorMsg("Por favor ingrese un correo electrónico");
      return;
    }
  
    setIsLoading(true);
    setErrorMsg("");
  
    try {
      // 1. Traer también first_name y first_surname
      const { data, error } = await supabase
        .from('person')
        .select('email, first_name, first_surname')
        .eq('email', emailInput)
        .maybeSingle();
  
      if (error) {
        console.error('Error al verificar el correo:', error);
        setErrorMsg("Error al verificar el correo. Intente nuevamente.");
        return;
      }
  
  
      if (!data) {
        setErrorMsg("Correo no encontrado. Verifique e intente nuevamente.");
        return;
      }
  
      const fullName = `${data.first_name} ${data.first_surname}`;
  
      // 2. Generar código de 8 dígitos
      const code = Math.floor(10000000 + Math.random() * 90000000).toString();
  
      // 3. Calcular fecha de expiración (5 minutos desde ahora)
      const localDate = new Date(Date.now() + 5 * 60 * 1000);
      const expiresAt = localDate.toLocaleString('sv-SE');
  
      // 4. Guardar el código en la base de datos
      const { error: updateError } = await supabase
        .from('person')
        .update({
          code_reset_pass: code,
          code_expires_at: expiresAt,
        })
        .eq('email', emailInput);
  
      if (updateError) {
        console.error('Error al guardar el código de verificación:', updateError);
        setErrorMsg("Error al guardar el código. Intente nuevamente.");
        return;
      }
  
      // 5. Enviar el correo personalizado
      const res = await fetch('/api/sendEmail/send-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, code, name: fullName }),
      });
  
      const sendResult = await res.json();
      if (!res.ok || !sendResult.success) {
        console.error('Error al enviar el correo:', sendResult.error);
        setErrorMsg("No se pudo enviar el código por correo.");
        return;
      }
  
      // 6. Avanzar si todo está bien
      setEmail(emailInput);
      nextStep();
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      setErrorMsg("Error al conectar con la base de datos.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div className="flex justify-center">
        <Image 
          src="/Logo_movu.png"
          alt="Logo"
          width={125}
          height={125}
          layout="fixed"
        />
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Restablecer contraseña</h2>
      <p className="text-sm mb-4 text-justify">
        Por seguridad del usuario se le mandará un correo
        con un código, el cual tendrá una 
        duración de 5 minutos.
        Para restablecer su contraseña ingrese los
        siguientes datos solicitados:
      </p>
      
      {errorMsg && (
        <p className="text-red-500 mb-4">{errorMsg}</p>
      )}
      
      <input
        type="email"
        placeholder="Ingrese su correo"
        className="w-full p-2 border rounded mb-4"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      /> 
      
      <div className="flex justify-end space-x-2">
        <Button 
          onClick={handleBack} 
          className="bg-gray-400"
          >
          Regresar
        </Button>
        
        <Button 
          onClick={handleContinue} 
          className="bg-emerald-400"
          disabled={isLoading}
        >
          {isLoading ? "Verificando..." : "Continuar"}
        </Button>
      </div>
    </div>
  );
}

export function StepTwo({ nextStep, prevStep, email }: { nextStep: () => void; prevStep: () => void; email: string }) {
  const [codeInput, setCodeInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para manejar el estado de carga

  const maskedEmail = email ? email.replace(/(\w{3})[\w.-]+@([\w.]+)/, "$1******@$2") : "";

  const handleVerifyCode = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true); // Activamos el estado de carga al iniciar la verificación

    if (!/^\d{8}$/.test(codeInput)) {
      setErrorMsg("El código debe tener exactamente 8 dígitos numéricos.");
      setIsLoading(false); // Desactivamos el estado de carga si ocurre un error
      return;
    }

    try {
      const { data, error } = await supabase
        .from('person')
        .select('code_reset_pass, code_expires_at')
        .eq('email', email)
        .maybeSingle();

      if (error || !data) {
        setErrorMsg("Error al verificar el código. Intente nuevamente.");
        setIsLoading(false); // Desactivamos el estado de carga si ocurre un error
        return;
      }

      const now = new Date(); // en UTC por defecto
      const expiresAt = new Date(data.code_expires_at);   

      // Verificación del código
      if (codeInput !== String(data.code_reset_pass)) {
        setErrorMsg("Código incorrecto. Vuelva a intentarlo.");
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
        setIsLoading(false); // Desactivamos el estado de carga si el código es incorrecto
        return;
      }

      // Verificación de expiración del código
      if (now > expiresAt) {
        setErrorMsg("El código ha expirado. Por favor, solicite uno nuevo.");
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
        setIsLoading(false); // Desactivamos el estado de carga si el código ha expirado
        return;
      }

      setErrorMsg("");
      setIsLoading(false); // Finalizamos el estado de carga si la verificación fue exitosa
      nextStep();
    } catch (err) {
      console.error("Error al conectar con Supabase:", err);
      setErrorMsg("Ocurrió un error al conectar con el servidor.");
      setIsLoading(false); // Desactivamos el estado de carga en caso de error
    }
  };

  const handleResendCode = async () => {
    setIsSending(true);
    setErrorMsg("");
    setSuccessMsg("");
    setCodeInput("");

    try {
      const { data, error } = await supabase
        .from('person')
        .select('first_name, first_surname')
        .eq('email', email)
        .maybeSingle();

      if (error || !data) {
        setErrorMsg("No se pudo reenviar el código. Intente más tarde.");
        return;
      }

      const fullName = `${data.first_name} ${data.first_surname}`;

      // Generación de nuevo código y su expiración
      const code = Math.floor(10000000 + Math.random() * 90000000).toString();
      const localDate = new Date(Date.now() + 5 * 60 * 1000);
      const expiresAt = localDate.toLocaleString('sv-SE');

      const { error: updateError } = await supabase
        .from('person')
        .update({
          code_reset_pass: code,
          code_expires_at: expiresAt,
        })
        .eq('email', email);

      if (updateError) {
        setErrorMsg("No se pudo reenviar el código. Intente más tarde.");
        return;
      }

      // Enviar correo con el nuevo código
      const res = await fetch('/api/sendEmail/resend-reset-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, name: fullName }),
      });

      const sendResult = await res.json();
      if (!res.ok || !sendResult.success) {
        console.error('Error al enviar el correo:', sendResult.error);
        setErrorMsg("No se pudo enviar el código por correo.");
        return;
      }

      // Éxito
      setSuccessMsg("Código reenviado con éxito. Revise su correo.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
    } catch (err) {
      console.error("Error al reenviar el código:", err);
      setErrorMsg("Ocurrió un error al reenviar el código.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div className="flex justify-center">
        <Image 
          src="/logo_movu.png"
          alt="Logo"
          width={125}
          height={125}
          layout="fixed"
        />
      </div>
      <h2 className="text-xl font-semibold mb-4">Código de verificación</h2>
      <p className="text-sm mb-4 text-justify">
        Ingrese el código de verificación que se le envió a su correo <span className="font-semibold">&quot;{maskedEmail}&quot;</span> sin guiones, para poder restablecer su contraseña.
      </p>

      <div className="w-full flex justify-center">
        <input
          type="text"
          inputMode="numeric"
          maxLength={8}
          value={codeInput}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, '');
            setCodeInput(onlyNumbers.slice(0, 8));
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData('Text');
            const onlyNumbers = pasted.replace(/\D/g, '').slice(0, 8);
            setCodeInput(onlyNumbers);
          }}
          className="w-2/3 p-2 outline-none text-center tracking-widest border-b border-gray-400"
          placeholder="XXXXXXXX"
        />
      </div>

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
      {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}

      <div className="mt-4 text-center">
        <button 
          onClick={handleResendCode}
          disabled={isSending}
          className="text-blue-400 text-sm hover:underline disabled:text-gray-400"
        >
          {isSending ? "Enviando..." : "Volver a enviar código"}
        </button>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={prevStep} className="bg-gray-400">
          Regresar
        </Button>
        <Button onClick={handleVerifyCode} className="bg-emerald-400">
          {isLoading ? "Verificando..." : "Continuar"} {/* Cambiar el texto del botón */}
        </Button>
      </div>
    </div>
  );
}


export function StepThree({ prevStep, email }: { prevStep: () => void; email: string }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
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


  const handleCloseAlert = () => {
    setOpenAlert(false);
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
    if (!/[@¿?=()\/&%$·"!\-+*._]/.test(pwd)) {
      issues.push("Debe contener al menos un carácter especial (@¿?=()/&% $·\"!-+*._)");
    }

    return issues;
  };

  const handleFinish = async () => {
    try {
      // Validar la contraseña
      const passwordIssues = validatePassword(password);
  
      if (password !== confirmPassword) {
        passwordIssues.push("Las contraseñas no coinciden");
      }
  
      if (passwordIssues.length > 0) {
        setErrors(passwordIssues);
        return;
      }
  
      setErrors([]);
  
      // 1. Primero verificar si el código ha expirado
      const { data, error: codeError } = await supabase
        .from('person')
        .select('code_expires_at')
        .eq('email', email)
        .maybeSingle();
  
      if (codeError) {
        console.error("Error al verificar el código:", codeError);
        setErrors(["Error al verificar el código. Intente nuevamente."]);
        return;
      }
  
      // Verificar si el código ha expirado
      if (!data || !data.code_expires_at) {
        setOpenAlert(true);
        setAlertType("error");
        setAlertMessage("No se encontró un código de verificación. Por favor, solicite uno nuevo.");
        return;
      }
  
      const now = new Date();
      const expiresAt = new Date(data.code_expires_at);
  
      if (now > expiresAt) {
        // Mostrar alerta de Material UI para código expirado
        setOpenAlert(true);
        setAlertType("error");
        setAlertMessage("El código ha expirado. Por favor, solicite uno nuevo.");
        return;
      }
  
      
      // 2. Si el código no ha expirado, continuar con el cambio de contraseña
      // Hashear la contraseña utilizando la función RPC personalizada en Supabase
      const { data: hashedPassword, error: hashError } = await supabase.rpc(
        "hash_password",
        { password }
      );
  
      if (hashError) {
        console.error("Error al hashear la contraseña:", hashError);
        setErrors(["Error al procesar la contraseña. Intente nuevamente."]);
        return;
      }
  
      // 3. Actualizar la contraseña hasheada en la tabla "person"
      const { error: updateError } = await supabase
        .from("person")
        .update({ 
          password: hashedPassword,
          // Opcional: limpiar el código de verificación después de usarlo exitosamente
          code_reset_pass: null,
          code_expires_at: null
        })
        .eq("email", email);
  
      if (updateError) {
        console.error("Error al actualizar la contraseña:", updateError);
        setErrors(["Error al actualizar la contraseña. Intente nuevamente."]);
        return;
      }
  
      // 4. Contraseña actualizada exitosamente
      
      // Mostrar alerta de éxito con Material UI
      setOpenAlert(true);
      setAlertType("success");
      setAlertMessage("Contraseña actualizada exitosamente.");
      
      // Redirigir después de mostrar el mensaje por un momento
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch (error) {
      console.error("Error inesperado:", error);
      setErrors(["Ha ocurrido un error inesperado. Intente nuevamente."]);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <div className="flex justify-center">
        <Image 
          src="/Logo_movu.png"
          alt="Logo"
          width={125}
          height={125}
          layout="fixed"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Restablecer Contraseña</h2>
      <p className="text-sm mb-4 text-justify">
        La contraseña debe contener:
        más de 8 caracteres, al menos una letra mayúscula, minúsculas,
        un carácter especial (@¿?=()/&%$·&quot;!-+*._), y un número.
      </p>

      {/* Inputs */}
      <div className="space-y-4">
        {/* Nueva contraseña */}
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su nueva contraseña"
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

        </div>

        {/* Confirmar contraseña */}
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme su nueva contraseña"
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Lista de errores */}
        {errors.length > 0 && (
          <ul className="text-red-500 text-sm mt-2 list-disc ml-5 space-y-1">
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
      </div>
      {/* Barra de seguridad */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="text-sm mb-1">
                Seguridad: <strong>{getPasswordStrength(password)}</strong>
              </div>
              <div className="w-full h-2 rounded bg-gray-200 overflow-hidden">
                <div
                  className={`h-full rounded transition-all duration-300 ${
                    getPasswordStrength(password) === "Muy segura"
                      ? "bg-green-500 w-full"
                      : getPasswordStrength(password) === "Segura"
                      ? "bg-yellow-500 w-2/3"
                      : "bg-red-500 w-1/3"
                  }`}
                />
              </div>
            </div>
          )}

      {/* Botones */}
      <div className="flex justify-end space-x-3 mt-6">
        <Button onClick={prevStep} className="bg-gray-400">
          Regresar
        </Button>
        <Button onClick={handleFinish} className="bg-emerald-400" >
          Finalizar
        </Button>

      </div>
      
      <Snackbar 
        open={openAlert} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity={alertType} 
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}