import nodemailer from 'nodemailer'
import 'dotenv/config'
const SMTP_HOST = process.env.SMTP_HOST;
const PORT = process.env.SMTP_PORT
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const MAIL_FROM = process.env.MAIL_FROM

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(PORT),
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    },
})

export const sendApplicationEmail = async (address, application, request) => {
    try {
        const mail = await transporter.sendMail({
            from: MAIL_FROM,
            to: address,
            subject: `Nuova candidatura per ${request.serviceType} a ${request.workAddress?.city}`,
            html:
                `<h2> Nuova candidatura</h2>
            <p>Per l'annuncio: <strong>${request.serviceType} a ${request.workAddress.city}</strong></p>
            <p style="text-transform: capitalize">Nome: ${application.name} ${application.lastName}</p>
            <p>Telefono:${application.phone}</p>
            <p>Email:${application.email}</p>
            <p>Messaggio: ${application.message}</p>`
        })

    } catch (error) {
        console.log(error)
    }}

