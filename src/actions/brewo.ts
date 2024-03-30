"use server";

import axios from "axios";
interface PayloadProps {
  payload: any;
}

export const sendEmailBrevo = async ({ payload }: PayloadProps) => {
  // console.log(payload);
  const url = "https://api.brevo.com/v3/smtp/email";
  const apiKey = process.env.BREVO;
  // const payload = {
  //   sender: {
  //     email: "mudasirpandith789@gmail.com",
  //     name: "Beams",
  //   },
  //   subject: "I got it.",
  //   templateId: 5,
  //   params: {
  //     greeting: "This is my default greeting",
  //     headline: "This is my default headline",
  //   },
  //   messageVersions: [
  //     {
  //       to: [
  //         {
  //           email: "ajfariz13@gmail.com",
  //           name: "Ajmal Fariz",
  //         },
  //       ],
  //       params: {
  //         firstName: "Ajmal",
  //         headline: "Be Ready for Takeoff.",
  //       },
  //       subject: "I am happy to share with you.",
  //     },
  //     {
  //       to: [
  //         {
  //           email: "mudasirpandith789@gmail.com",
  //           name: "Mudasir Pandith",
  //         },
  //       ],
  //       params: {
  //         firstName: "Mudasir",
  //         headline: "Be Ready for Takeoff.",
  //       },
  //       subject: "Welcome Ajmal, Start Your Inspiring Journey",
  //     },
  //     {
  //       to: [
  //         {
  //           email: "mbawri@gmail.com",
  //           name: "Malvika",
  //         },
  //       ],
  //       params: {
  //         firstName: "Malvika",
  //         headline: "Be Ready for Takeoff.",
  //       },
  //       subject: "Welcome Malvika, Start Your Inspiring Journey",
  //     },
  //   ],
  // };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
    });

    console.log("Email sent successfully!", response.data);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
