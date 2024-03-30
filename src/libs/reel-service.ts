import { Reel } from "@/types/user.types";
import { db } from "./db";

export const getReel = async (moduleId?: string): Promise<Reel> => {
  try {
    const reel = await db.reel.findFirst({
      where: {
        moduleId,
      },
      include: {
        videoUrl: {
          select: {
            url: true,
          },
        },
      },
    });
    return reel as Reel;
  } catch (error) {
    throw error;
  }
};
