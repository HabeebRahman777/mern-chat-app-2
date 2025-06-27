
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const confirm_url= import.meta.env.MODE === "development" ? "http://localhost:5173/confirm-email":"/confirm-email"

export const sendConfirmationEmail = async (userEmail, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const confirmLink = `${confirm_url}?token=${token}`; // or your frontend domain

  try{
    await transporter.sendMail({
        from: `"ChatApp" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: 'Please confirm your email',
        html: `
        <h2>Welcome to ChatApp!</h2>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="${confirmLink}">Confirm Email</a>
        `,
    });
    console.log('Confirmation email sent to:', userEmail);
    }catch(error){
        console.error('Error sending email:', error);
    }
};
