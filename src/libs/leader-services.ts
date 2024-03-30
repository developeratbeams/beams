import { getAuther } from "./getAuther";
import { db } from "@/libs/db";

export const isAttempted = async (attemptId: string | undefined | null) => {
  try {
    const self = await getAuther();
    if (!self || !self.id) throw new Error("unauthorised");
    let attempt;
    if (attemptId) {
      attempt = await db.leaderAttempt.findFirst({
        where: {
          userId: self.id!,
          attemptId: String(attemptId),
        },
      });
    } else {
      attempt = await db.leaderAttempt.findFirst({
        where: {
          userId: self.id!,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }
    console.log(attempt);
    return attempt;
  } catch (error) {
    console.log(error);
  }
};
