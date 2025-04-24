'use client';

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import{ Snackbar, Alert } from "@mui/material";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function DriverLicenseAndSelfiePage() {
  const router = useRouter();
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiration, setLicenseExpiration] = useState('');

  const isFormComplete = licenseNumber.trim() !== '' && licenseExpiration.trim() !== '' && selfiePreview !== null;

  // Función para guardar en localStorage con expiración
  const setLocalStorageWithExpiry = (key: string, value: string, hours: number) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + hours * 60 * 60 * 1000,
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  // Función para obtener de localStorage verificando expiración
  const getLocalStorageWithExpiry = (key: string) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    
    try {
      // Intenta parsear como JSON
      const item = JSON.parse(itemStr);
      
      // Verifica si tiene la estructura esperada
      if (item && item.value !== undefined && item.expiry !== undefined) {
        const now = new Date();
        
        // Comparar la fecha de expiración con la fecha actual
        if (now.getTime() > item.expiry) {
          // Si ha expirado, eliminar del localStorage
          localStorage.removeItem(key);
          return null;
        }
        return item.value;
      } else {
        setLocalStorageWithExpiry(key, itemStr, 24);
        return itemStr;
      }
    } catch  {
      // Si falla el parseo de JSON, significa que es un string simple
      // Usamos el valor directamente y lo actualizamos al nuevo formato
      setLocalStorageWithExpiry(key, itemStr, 24);
      return itemStr;
    }
  };
  


  useEffect(() => {

    try {
      // Cargar datos con verificación de expiración
      const savedLicense = getLocalStorageWithExpiry('licenseNumber');
      const savedExpiration = getLocalStorageWithExpiry('licenseExpiration');
      const savedSelfiePreview = getLocalStorageWithExpiry('selfiePreview');

      if (savedLicense) setLicenseNumber(savedLicense);
      if (savedExpiration) setLicenseExpiration(savedExpiration);
      if (savedSelfiePreview) setSelfiePreview(savedSelfiePreview);
    } catch (e) {
      console.error("Error al cargar datos del localStorage:", e);
    }
  }, []);

  const handleSelfieClick = () => selfieInputRef.current?.click();

  const handleSelfieUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setSelfiePreview(base64);
        setLocalStorageWithExpiry('selfiePreview', base64, 24);
      };
      reader.readAsDataURL(file);
    }
  };

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleCloseAlert = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpenAlert(false);
  };


  const handleSubmit = async () => {
    if (!isFormComplete) {
      setAlertType('error');
      setAlertMessage('Por favor completa todos los campos.');
      setOpenAlert(true);
      return;
    }
  
    try {
      // Verificar si el número de licencia ya existe
      const { data: existingCarrier, error } = await supabase
        .from('carrier')
        .select('id')
        .eq('license', licenseNumber)
        .maybeSingle();
  
      if (error) {
        console.error('Error verificando licencia:', error.message);
        setAlertType('error');
        setAlertMessage('Ocurrió un error al verificar la licencia. Intenta de nuevo.');
        setOpenAlert(true);
        return;
      }
  
      if (existingCarrier) {
        setAlertType('error');
        setAlertMessage('Número de licencia ya registrado.');
        setOpenAlert(true);
        return;
      }
  
      // Guardar en localStorage con expiración de 24 horas
      setLocalStorageWithExpiry('licenseNumber', licenseNumber, 24);
      setLocalStorageWithExpiry('licenseExpiration', licenseExpiration, 24);
      setLocalStorageWithExpiry('selfiePreview', selfiePreview!, 24);
      setLocalStorageWithExpiry('driverLicenseCompleted', 'true', 24);
  
      router.push("/register_conductor/information");
  
    } catch (err) {
      console.error('Error en handleSubmit:', err);
      setAlertType('error');
      setAlertMessage('Ocurrió un error inesperado. Intenta de nuevo.');
      setOpenAlert(true);
    }
  };
  
  

  return (
    <div className="bg-[#0D3A45] text-white flex flex-col items-center px-4 min-h-screen">
      <div className="h-[10vh] w-full mt-5 text-center">
        <h1 className="text-xl text-white font-semibold">Registro del Conductor</h1>
      </div>

      {/* Selfie */}
      <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-6 flex flex-col items-center">
        <Image
          src={selfiePreview || "/selfie.png"}
          alt="Selfie"
          width={192}
          height={192}
          className="rounded mb-4 object-cover"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleSelfieUpload}
          ref={selfieInputRef}
          className="hidden"
        />
        <p className="text-sm text-gray-600 mt-2 text-center">
          Tómate una foto con tu licencia de conducir junto a tu rostro. Asegúrate de que tu cara y la información del documento sean claramente visibles.
        </p>
        <button
          onClick={handleSelfieClick}
          className="border border-emerald-500 text-emerald-500 px-4 py-2 rounded-full mt-4"
        >
          Subir Selfie
        </button>
      </div>

      {/* Número de Licencia */}
      <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-6">
        <p className="text-sm text-justify">Número de licencia de conducir.</p>
        <input
          type="text"
          value={licenseNumber}
          onChange={(e) => {
            const newValue = e.target.value;
            setLicenseNumber(newValue);
            setLocalStorageWithExpiry('licenseNumber', newValue, 24);
          }}
          placeholder="Número de licencia"
          className="w-full mt-4 px-4 py-2 border rounded text-sm"
        />
      </div>

      {/* Fecha de Expiración */}
      <div className="bg-white text-black p-6 rounded-lg w-11/12 max-w-md mb-6">
        <p className="text-sm text-justify">Fecha de expiración de tu licencia.</p>
        <input
          type="date"
          value={licenseExpiration}
          onChange={(e) => {
            const newValue = e.target.value;
            setLicenseExpiration(newValue);
            setLocalStorageWithExpiry('licenseExpiration', newValue, 24);
          }}
          className="w-full mt-4 px-4 py-2 border rounded text-sm"
        />
      </div>

      {/* Botón Aceptar */}
      <button
        onClick={handleSubmit}
        disabled={!isFormComplete}
        className={`px-8 py-3 rounded-full mt-2 ${
          isFormComplete ? "bg-[#21E6C1] text-black" : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        Aceptar
      </button>

      <Link href="/register_conductor/information">
        <button className="mt-8 mb-8 text-sm underline">Regresar</button>
      </Link>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}