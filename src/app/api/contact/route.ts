import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// E-Mail-Transporter konfigurieren
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, betreff, nachricht, kategorie } = data

    // Validierung
    if (!name || !email || !betreff || !nachricht || !kategorie) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus.' },
        { status: 400 }
      )
    }

    // E-Mail erstellen
    const mail = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Neue Kontaktanfrage: ${betreff}`,
      text: `
        Neue Kontaktanfrage von der Website:
        
        Name: ${name}
        E-Mail: ${email}
        Kategorie: ${kategorie}
        Betreff: ${betreff}
        
        Nachricht:
        ${nachricht}
      `,
      html: `
        <h2>Neue Kontaktanfrage von der Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Kategorie:</strong> ${kategorie}</p>
        <p><strong>Betreff:</strong> ${betreff}</p>
        <h3>Nachricht:</h3>
        <p>${nachricht.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email // Ermöglicht direkte Antwort an den Absender
    }

    // E-Mail senden
    await transporter.sendMail(mail)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
} 