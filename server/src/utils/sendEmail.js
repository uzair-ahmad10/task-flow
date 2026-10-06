import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async ( email, message ) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Welocome - TaskFLow",
    html: message, // Uses 'html' here because the template we are passing contains HTML tags
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};
