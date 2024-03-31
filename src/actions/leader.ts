/**
 * Saves the attempt and answers for a leader.
 * @param attemptId - The ID of the attempt.
 * @param answers - The answers provided by the leader.
 * @throws Error if unauthorized or if something goes wrong.
 */
"use server";
import { getAuther } from "@/libs/getAuther";
import { db } from "@/libs/db";
import { revalidatePath } from "next/cache";
import { saveModuleActivity } from "./module";
import { sendEmailBrevo } from "./brewo";

export const saveAttempt = async (attemptId: string, answers: any) => {
  try {
    const self = await getAuther();
    if (!self || !self.id) throw new Error("unauthorised");
    await db.leaderAttempt.create({
      data: {
        userId: self.id!,
        answers,
        attemptId,
      },
    });
    saveModuleActivity("23390cb6-5f5e-41d1-b637-ad9e42d179c5", "LEADER");
    revalidatePath(`/home/beams-leader/leader-1`);
    const user = await db.user.findUnique({
      where: { id: self?.id },
      select: { email: true, firstName: true, lastName: true },
    });
    let payload = {};

    payload = {
      sender: {
        email: "innbrieff@gmail.com",
        name: "Beams",
      },
      subject: "I got it.",
      templateId: 5,
      params: {
        greeting: "This is my default greeting",
        headline: "This is my default headline",
      },
      messageVersions: [
        {
          to: [
            {
              email: user?.email,
              name: `${user?.firstName} ${user?.lastName}`,
            },
          ],
          params: {
            firstName: user?.firstName,
            headline: "Be Ready for Takeoff.",
          },
          subject: `Leadership Insights Unveiled!`,
        },
      ],
    };
    await sendEmailBrevo({ payload });
    payload = {
      sender: {
        email: "innbrieff@gmail.com",
        name: "Beams",
      },
      subject: "I got it.",
      templateId: 3,
      params: {
        greeting: "This is my default greeting",
        headline: "This is my default headline",
      },
      messageVersions: [
        {
          to: [
            {
              email: user?.email,
              name: `${user?.firstName} ${user?.lastName}`,
            },
          ],
          params: {
            firstName: user?.firstName,
            headline: "Be Ready for Takeoff.",
          },
          subject: `Congratulations on Completing Your Module!`,
        },
      ],
    };
    await sendEmailBrevo({ payload });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
