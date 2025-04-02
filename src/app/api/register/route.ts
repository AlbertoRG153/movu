import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabaseClient";
import bcrypt from "bcryptjs"; // Para encriptar contraseñas

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      first_name,
      second_name,
      first_surname,
      second_surname,
      birthdate,
      genre,
      dni,
      email,
      password,
      id_city
    } = body;

    // Validar campos obligatorios
    if (!first_name || !first_surname || !email || !password || !id_city) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    //ver si no esta ya registrado el correo
    const { data: existingUser, error: userError } = await supabase
      .from("person")
      .select("email")
      .eq("email", email)
      .single();

    if (userError && userError.code !== "PGRST116") {
      return NextResponse.json({ error: "Error al verificar usuario" }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({ error: "El correo ya está registrado" }, { status: 409 });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from("person")
      .insert([{
        first_name,
        second_name,
        first_surname,
        second_surname,
        birthdate,
        genre,
        dni,
        email,
        password: hashedPassword,
        id_city
      }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Usuario registrado con éxito", data }, { status: 201 });

  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}