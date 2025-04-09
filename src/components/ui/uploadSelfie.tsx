 import { supabase } from '@/lib/supabase/supabaseClient';

export async function uploadSelfie(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
const filePath = `${userId}/selfie.${fileExt}`;
console.log(filePath)


  const { data, error } = await supabase.storage
    .from("carriers")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error subiendo imagen:", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("carriers")
    .getPublicUrl(filePath);

  return publicUrlData?.publicUrl || null;
} 