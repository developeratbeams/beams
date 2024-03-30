import { Story } from "@/types/user.types";
import { db } from "./db";

export const getStories = async (): Promise<Story[] | undefined | null> => {
  try {
    const stories = await db.story.findMany({});
    if (!stories) return null;
    return stories as Story[];
  } catch (error) {
    throw error;
  }
};

export const getStoriesById = async (
  storyId: string
): Promise<Story | null | undefined> => {
  try {
    const story = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (!story) return undefined;
    return story as Story;
  } catch (error) {
    throw error;
  }
};
