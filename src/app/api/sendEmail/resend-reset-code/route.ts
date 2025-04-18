// src/app/api/sendEmail/send-reset-code/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, code, name } = await req.json();

    if (!email || !code || !name) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2>Hola ${name},</h2>
        <p>Hemos recibimos una solicitud de reenvio de cogido para restablecer tu contraseña.</p>
        <p><strong>Tu código para restablecer tu contraseña es:</strong></p>
        <div style="background-color: #f2f2f2; padding: 20px; border-radius: 10px; text-align: center;">
          <h1 style="color: #1a73e8; letter-spacing: 2px;">${code}</h1>
        </div>
        <p>Este código es válido solo por <strong>5 minutos</strong>.</p>
        <p>Si tú no solicitaste este código, puedes ignorar este mensaje o contactarte con nosotros.</p>

        <br />
        <p>Atentamente,</p>
        <p>El equipo de Movu</p>

        <hr style="margin: 30px 0;" />
        <div style="text-align: center;">
          <img src="cid:logo" alt="Movu Logo" style="width: 120px; opacity: 0.8;" />
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Reenvio de código para restablecer tu contraseña',
      html: htmlContent,
      attachments: [
        {
          filename: 'Logo_movu.png',
          path: `${process.cwd()}/public/Logo_movu.png`,
          cid: 'logo', // Este "cid" debe coincidir con el src: "cid:logo"
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error al enviar el correo:', err);
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
  }
}
