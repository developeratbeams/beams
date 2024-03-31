import { Image } from "@/types/user.types";
import { getAuther } from "./getAuther";
import { db } from "./db";

export const getImagesForStory = async (
  storyId: string
): Promise<Image[] | undefined | null> => {
  try {
    const self = await getAuther();
    const existingStory = await db.storySubmission.findFirst({
      where: {
        userId: self?.id,
        storyId,
      },
    });

    let images: Image[] | null = [];

    if (existingStory) {
      const submmitted = await db.storySubmission.findFirst({
        where: {
          userId: self?.id,
          storyId,
          status: "DISABLED",
        },
      });

      if (submmitted) {
        images = null;
      } else {
        const pageNo =
          existingStory.noOfSlideDone === 18
            ? existingStory.noOfSlideDone
            : Number(existingStory.noOfSlideDone) + 1;

        images = (await db.image.findMany({
          where: {
            storyId,
            pageNoInUserMadeStory: pageNo,
          },
        })) as Image[];
      }
    } else {
      images = (await db.image.findMany({
        where: {
          storyId,
          pageNoInUserMadeStory: 0,
        },
      })) as Image[];
    }

    return images;
  } catch (error) {
    throw error;
  }
};

export const getCompletedSlides = async (
  storyId: string
): Promise<Image[] | null | undefined> => {
  try {
    const self = await getAuther();
    const slides = await db.image.findMany({
      where: {
        storyId,
        userId: self?.id,
      },
    });
    return slides as Image[];
  } catch (error) {
    throw error;
  }
};
