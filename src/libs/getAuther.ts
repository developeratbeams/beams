import { User } from "@/types/user.types";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const getAuther = async (): Promise<User | undefined> => {
  try {
    const self = await currentUser();

    if (!self || !self.id) {
      return undefined;
    }

    // await db.image.deleteMany({
    //   where: { storyId: "1f5926c5-e214-432d-9f14-721de14cf5b8" },
    // });
    // console.log("deleted");
    // await db.image.create({
    //   data: {
    //     url: "https://newspace.blr1.cdn.digitaloceanspaces.com/Writer-images-magical-materials/untitled-design-52-65c369083588d.webp",
    //     isCoverPage: true,
    //     pageNoInUserMadeStory: 0,
    //     storyId: "1f5926c5-e214-432d-9f14-721de14cf5b8",
    //     moduleId: "1f5926c5-e214-432d-9f14-721de14cf5b9",
    //     imageType: "BACKGROUND",
    //   },
    // });
    // console.log("saved");
    // await db.story.create({
    //   data: {
    //     moduleId:"jn",
    //     storyTitle: "jhv",
    //     pageCount: 2,
    //   },
    // });
    const user = await db.user.findFirst({
      where: {
        userId: self.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        grade: true,
        totalScore: true,
        onBoarding: true,
        profilePictureUrls: {
          where: {
            isProfile: true,
          },
          select: {
            url: true,
          },
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return user as User;
  } catch (error) {
    throw error;
  }
};
