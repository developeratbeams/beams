import { JigSaw, JigSawAttempt } from "@/types/user.types";
import { db } from "./db";
import { getAuther } from "./getAuther";

export const getAllJigSaw = async (): Promise<JigSaw[] | undefined> => {
  try {
    const jigsaws = await db.jigSaw.findMany();
    if (!jigsaws) return undefined;
    return jigsaws as JigSaw[];
  } catch (error) {
    throw error;
  }
};

export const getJigSawById = async (
  jigsawId: string
): Promise<JigSaw | undefined> => {
  try {
    const jigsaw = await db.jigSaw.findUnique({
      where: { id: jigsawId },
      include: { image: { select: { url: true } } },
    });
    if (!jigsaw) return undefined;
    return jigsaw as JigSaw;
  } catch (error) {
    throw error;
  }
};

export const isAttemptedJigSaw = async (
  jigSawId: string
): Promise<JigSawAttempt | undefined> => {
  const self = await getAuther();

  if (!self || !self.id) new Error("Unauthorised access");
  const userId: string = self?.id!;
  try {
    const isAttempted = await db.jigSawAttempt.findUnique({
      where: { userId_jigSawId: { userId, jigSawId } },
    });
    return isAttempted as JigSawAttempt;
  } catch (error) {
    throw error;
  }
};
