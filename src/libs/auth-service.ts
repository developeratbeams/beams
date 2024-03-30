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

export const getSelf = async (): Promise<User | undefined> => {
  try {
    const self = await currentUser();

    if (!self || !self.id) {
      return undefined;
    }

    const user = await db.user.findFirst({
      where: { userId: self.id },
      include: {
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
        favouriteModules: {
          include: {
            Module: {
              include: {
                moduleThumnailUrls: {
                  select: {
                    url: true,
                  },
                },
                Favourite: true,
              },
            },
          },
        },
        School: true,
      },
    });

    if (!user) {
      return undefined;
    }

    return user as unknown as User;
  } catch (error) {
    throw error;
  }
};

export const onBoardingDone = async (): Promise<boolean | undefined> => {
  try {
    const self = await currentUser();

    if (!self || !self.id) {
      return undefined;
    }
    const onboarding = await db.user?.findFirst({
      where: {
        userId: self?.id,
        onBoarding: false,
      },
    });
    return !!onboarding;
  } catch (error) {
    throw error;
  }
};
