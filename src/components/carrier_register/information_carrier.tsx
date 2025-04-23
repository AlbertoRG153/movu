'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/supabaseClient';
import { Alert, Snackbar } from '@mui/material';
import { Check } from 'lucide-react';

export function InformationCarrier() {
  const router = useRouter();
  const [driverLicenseCompleted, setDriverLicenseCompleted] = useState(false);
  const [vehicleInfoCompleted, setVehicleInfoCompleted] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Función para obtener datos del localStorage con verificación de expiración
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
        // Si no tiene la estructura esperada, usar el valor directamente
        return itemStr;
      }
    } catch  {
      // Si falla el parseo de JSON, significa que es un string simple
      return itemStr;
    }
  };

  useEffect(() => {
    // Usar el nuevo método para obtener datos con expiración
    const dlComplete = getLocalStorageWithExpiry('driverLicenseCompleted') === 'true';
    const viComplete = getLocalStorageWithExpiry('vehicleInfoCompleted') === 'true';
    setDriverLicenseCompleted(dlComplete);
    setVehicleInfoCompleted(viComplete);
  }, []);

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Obtener datos del localStorage en lugar de cookies
      const vehicleType = getLocalStorageWithExpiry('vehicleType');
      const plateNumber = getLocalStorageWithExpiry('plateNumber');
      const brand = getLocalStorageWithExpiry('brand');
      const model = getLocalStorageWithExpiry('model');
      const color = getLocalStorageWithExpiry('color');
      const vehiclePhoto = getLocalStorageWithExpiry('vehiclePhoto');
  
      const licenseNumber = getLocalStorageWithExpiry('licenseNumber');
      const licenseExpiration = getLocalStorageWithExpiry('licenseExpiration');
      const selfiePreview = getLocalStorageWithExpiry('selfiePreview');
  
      const userData = JSON.parse(localStorage.getItem('main_view') || '{}');
      const userId = userData.userId;
  
      if (!vehicleType || !plateNumber || !brand || !model || !color || !vehiclePhoto) {
        throw new Error('Faltan datos del vehículo.');
      }
  
      if (!licenseNumber || !licenseExpiration || !selfiePreview) {
        throw new Error('Faltan datos de licencia.');
      }
  
      // Subir imagen del vehículo
      const vehicleFile = dataURLtoFile(vehiclePhoto, `vehicle-${userId}.jpg`);
      const vehiclePath = `vehicles/${userId}-${Date.now()}.jpg`;
      const { data: vehicleUpload, error: vehicleError } = await supabase.storage
        .from('carriers')
        .upload(vehiclePath, vehicleFile);
  
      if (vehicleError) throw vehicleError;
  
      const vehicleUrl = supabase.storage
        .from('carriers')
        .getPublicUrl(vehicleUpload.path).data.publicUrl;
  
      // Insertar vehículo
      const { data: vehicleInsert, error: vehicleInsertError } = await supabase
        .from('vehicle')
        .insert({
          id_vehicle_type: vehicleType,
          plate_number: plateNumber,
          brand,
          model,
          color,
          vehicle_img: vehicleUrl,
        })
        .select()
        .single();
  
      if (vehicleInsertError) throw vehicleInsertError;
      const vehicleId = vehicleInsert.id;
  
      // Subir selfie
      const selfieFile = dataURLtoFile(selfiePreview, `selfie-${userId}.jpg`);
      const selfiePath = `selfies/${userId}-${Date.now()}.jpg`;
      const { data: selfieUpload, error: selfieError } = await supabase.storage
        .from('carriers')
        .upload(selfiePath, selfieFile);
  
      if (selfieError) throw selfieError;
  
      const selfieUrl = supabase.storage
        .from('carriers')
        .getPublicUrl(selfieUpload.path).data.publicUrl;
  
      // Insertar carrier
      const { error: carrierError } = await supabase
        .from('carrier')
        .insert({
          id: userId,
          id_person: userId,
          license: licenseNumber,
          license_expiration: licenseExpiration,
          license_img: selfieUrl,
          id_vehicle: vehicleId,
        });
  
      if (carrierError) throw carrierError;
  
      // 👉 Actualizar verification_carrier a true en la tabla person
      const { error: updatePersonError } = await supabase
        .from('person')
        .update({ verification_carrier: true })
        .eq('id', userId);
  
      if (updatePersonError) throw updatePersonError;
  
      // Limpiar localStorage después de subir los datos exitosamente
      localStorage.removeItem('vehicleType');
      localStorage.removeItem('plateNumber');
      localStorage.removeItem('brand');
      localStorage.removeItem('model');
      localStorage.removeItem('color'); 
      localStorage.removeItem('vehiclePhoto');
      localStorage.removeItem('licenseNumber');
      localStorage.removeItem('licenseExpiration');
      localStorage.removeItem('selfiePreview');
      localStorage.removeItem('driverLicenseCompleted');
      localStorage.removeItem('vehicleInfoCompleted');
  
      setAlertType('success');
      setAlertMessage('¡Datos guardados correctamente!');
      setOpenAlert(true);
      setTimeout(() => {
        const returnPath = localStorage.getItem('redirect_back_to')

        if (returnPath) {
          localStorage.removeItem('redirect_back_to') 
          router.push(returnPath)
        }
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        setAlertType('error');
        setAlertMessage(`Error: ${error.message}`);
      } else {
        setAlertType('error');
        setAlertMessage('Error desconocido');
      }
      setOpenAlert(true);
    }
  };
  

  const handleNextDriverLicense = () => router.push('/carrier_register/driver_license');
  const handleNextVehicleInformation = () => router.push('/carrier_register/vehicle_information');
 
  const handleClose = () => {
    const returnPath = localStorage.getItem('redirect_back_to')
    if (returnPath) {
      localStorage.removeItem('redirect_back_to')
      router.push(returnPath)
    } 
  }
    const handleCloseAlert = () => setOpenAlert(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="h-[10vh] bg-[#0D3A45] flex justify-end items-center px-6">
        <button className="text-sm text-white px-4 py-1 rounded-md" onClick={() => setShowModal(true)}>
          Cerrar
        </button>
      </div>

      <div className="flex-grow bg-[#0D3A45] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md text-center text-white">
          <h1 className="text-2xl font-bold mb-8">Verificación</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            <button
              type="button"
              className="w-11/12 max-w-sm py-3 bg-white text-black rounded-xl hover:bg-gray-200 flex items-center justify-between px-4"
              onClick={handleNextDriverLicense}
            >
              <span>Licencia de conducir</span>
              {driverLicenseCompleted && <Check className="text-green-500 w-5 h-5" />}
            </button>

            <button
              type="button"
              className="w-11/12 max-w-sm py-3 bg-white text-black rounded-xl hover:bg-gray-200 flex items-center justify-between px-4"
              onClick={handleNextVehicleInformation}
            >
              <span>Información acerca del vehículo</span>
              {vehicleInfoCompleted && <Check className="text-green-500 w-5 h-5" />}
            </button>

            <button
              type="submit"
              disabled={!(driverLicenseCompleted && vehicleInfoCompleted)}
              className={`w-1/2 max-w-xs font-medium px-6 py-3 mt-4 rounded-full transition-colors ${
                driverLicenseCompleted && vehicleInfoCompleted
                  ? 'bg-[#21E6C1] hover:bg-[#17bca2] text-black'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              Aceptar
            </button>

            <p className="text-xs mt-10 w-11/12 max-w-sm text-gray-300 text-justify">
              Al pulsar &quot;Aceptar&quot; estás aceptando nuestros Términos y condiciones y condiciones de Política de privacidad.
            </p>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-8/10 text-center">
            <h2 className="text-sm font-semibold mb-4 text-justify text-gray-800">
              ¿Estás seguro de que no quieres continuar registrándote como conductor?
            </h2>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={() => setShowModal(false)} className="text-sm text-gray-800 px-4 py-2">
                Cancelar
              </button>
              <button onClick={handleClose} className="text-sm text-red-600 px-4 py-2 rounded">
                Sí, cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseAlert} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}