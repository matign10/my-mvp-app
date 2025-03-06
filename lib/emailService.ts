import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: EmailData) {
  const { name, email, subject, message } = data;
  
  console.log('Iniciando configuración de email...');
  console.log('Host:', process.env.SMTP_HOST);
  console.log('Puerto:', process.env.SMTP_PORT);
  console.log('Usuario:', process.env.SMTP_USER);
  
  // Crear el transportador de email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true para 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Verificar la conexión
  try {
    console.log('Verificando conexión SMTP...');
    await transporter.verify();
    console.log('Conexión SMTP verificada correctamente');
  } catch (error) {
    console.error('Error al verificar conexión SMTP:', error);
    return { success: false, error: 'Error de conexión SMTP' };
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `Nuevo mensaje de contacto: ${subject}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Asunto: ${subject}
      
      Mensaje:
      ${message}
    `,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    console.log('Intentando enviar email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado correctamente:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error detallado al enviar email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    return { 
      success: false, 
      error: error.message,
      details: {
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode
      }
    };
  }
} 