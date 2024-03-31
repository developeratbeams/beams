/**
 * Saves a jigsaw attempt in the database.
 * @param {Object} body - The request body.
 * @param {DIFFICULTY} body.difficulty - The difficulty level of the jigsaw.
 * @param {string} body.jigSawId - The ID of the jigsaw.
 * @param {boolean} body.quit - Indicates if the user quit the jigsaw.
 * @returns {Promise<string | undefined>} - A promise that resolves to "Saved" if the attempt is saved successfully, or undefined if the attempt is already done.
 * @throws {Error} - If there is an error saving the jigsaw attempt.
 */
"use server";

import { db } from "@/libs/db";
import { DIFFICULTY } from "@/types/constants";
import { auth } from "@clerk/nextjs";
import { saveModuleActivity } from "./module";
import { getAuther } from "@/libs/getAuther";
import { revalidatePath } from "next/cache";
import { sendEmailBrevo } from "./brewo";

interface body {
  difficulty?: DIFFICULTY;
  jigSawId: string;
  quit?: boolean;
}
export const saveJigsawAttempt = async ({
  difficulty,
  jigSawId,
  quit,
}: body): Promise<string | undefined> => {
  try {
    const self = await getAuther();

    if (!self || !self.id) new Error("Unauthorised access");
    const userId = self?.id;

    const alreadyDone = await db.jigSawAttempt.findUnique({
      where: { userId_jigSawId: { userId: String(userId), jigSawId } },
    });
    var score = 0;
    if (difficulty === DIFFICULTY.EASY) score = 300;
    else if (difficulty === DIFFICULTY.MEDIUM) score = 600;
    else score = 900;
    const payload = {
      sender: {
        email: "innbrieff@gmail.com",
        name: "Beams",
      },
      subject: "I got it.",
      templateId: 7,
      params: {
        greeting: "This is my default greeting",
        headline: "This is my default headline",
      },
      messageVersions: [
        {
          to: [
            {
              email: self?.email,
              name: `${self?.firstName} ${self?.lastName}`,
            },
          ],
          params: {
            firstName: self?.firstName,
            beams: score,
          },
          subject: `Puzzle Master! 🚀 What's Next?`,
        },
      ],
    };
    await sendEmailBrevo({ payload });
    if (alreadyDone) return undefined;
    if (quit && typeof quit === "boolean") {
      await db.jigSawAttempt.create({
        data: {
          userId: String(userId),
          jigSawId,
          quit,
        },
      });
    } else {
      await db.jigSawAttempt.create({
        data: {
          userId: String(userId),
          jigSawId,
          difficulty,
        },
      });
      const moduleAttempt = await db.moduleAttempt.findFirst({
        where: {
          moduleId: "23390cb6-5f5e-41d1-b637-ad9e42d179c5",
          userId: self?.id,
        },
      });
      if (!moduleAttempt?.products.some((prod) => prod === "JIGSAW")) {
        await db.user.update({
          where: {
            id: self?.id,
          },
          data: {
            totalScore: Number(self?.totalScore) + score,
          },
        });
      }
    }

    saveModuleActivity("23390cb6-5f5e-41d1-b637-ad9e42d179c5", "JIGSAW");
    revalidatePath(`/home/jigsaw/${jigSawId}`);
    return "Saved";
  } catch (error) {
    throw error;
  }
};
