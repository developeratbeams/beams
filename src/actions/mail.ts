"use server";
import { db } from "@/libs/db";
import nodemailer from "nodemailer";

export async function sendEmail({ name, email, subject, message }: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // `true` for port 465, `false` for all other ports
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY,
      },
    });
    const sent = await transporter.sendMail({
      from: '"Beams👻" <mudasirpandith789@gmail.com>', // sender address
      to: [email], // list of receivers
      subject: subject, // Subject line
      text: "", // plain text body
      html: message, // html body
    });
    if (sent) {
      await db.emailLogs.create({
        data: {
          email,
        },
      });
    }
    console.log("Mail Sent!");
  } catch (error) {
    console.log(error);
  }
}
