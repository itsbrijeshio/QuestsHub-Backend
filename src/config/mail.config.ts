import { createTransport } from "nodemailer";
import env from "./env.config";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

const sendMail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: env.MAIL_USER,
    to,
    subject,
    text,
  });
};

export default sendMail;
