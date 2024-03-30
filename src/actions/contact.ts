/**
 * Saves a contact message to the database and sends an email notification.
 * @param name - The name of the contact person.
 * @param email - The email address of the contact person.
 * @param message - The message content.
 * @returns A promise that resolves to a success message or undefined.
 * @throws If there is an error while saving the message or sending the email.
 */
"use server";
import { db } from "@/libs/db";
import { sendEmail } from "./mail";

export const saveMessage = async (
  name: string,
  email: string,
  message: string
): Promise<string | undefined> => {
  try {
    await db.contact.create({
      data: {
        name,
        email,
        message,
      },
    });
    const body = {
      name: name,
      email: email,
      subject: "Message from Beams",
      message: message,
    };
    await sendEmail(body);
    return "Your message has been saved. We will contact you soon.";
  } catch (error) {
    throw error;
  }
};
