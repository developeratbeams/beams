"use server";
import { getSelf } from "@/libs/auth-service";
import { getAuther } from "@/libs/getAuther";
import { db } from "@/libs/db";
import { User } from "@/types/user.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendEmailBrevo } from "./brewo";
export const changeProfileImage = async (
  url: string
): Promise<string | null> => {
  try {
    const self = await getSelf();
    const newImage = await db.image.create({
      data: {
        url,
        userId: self?.id,
        isProfile: true,
      },
    });

    await db.user.update({
      where: {
        id: self?.id,
      },
      data: {
        profilePictureUrls: {
          connect: { id: newImage.id },
        },
      },
    });

    revalidatePath("/home/edit-profile");
    return "Profile picture changed";
  } catch (error) {
    throw error;
  }
};

interface UserDetails {
  firstName: string;
  lastName: string;
  username?: string;
  dateOfBirth: Date;
  gender: "MALE" | "FEMALE" | "BISEXUAL" | "TRANSGENDER" | "PREFER_NOT_TO_SAY";
  grade: string;
  schoolName: string;
  interests?: string[];
}
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export const changeUserDetails = async ({
  firstName,
  lastName,
  dateOfBirth,
  gender,
  schoolName,
  username,
  grade,
  interests,
}: UserDetails): Promise<string | null> => {
  try {
    const self = await getSelf();
    const newSchool = await db.school.create({
      data: {
        nameOfSchool: toTitleCase(schoolName),
        Students: {
          connect: {
            id: self?.id,
          },
        },
      },
    });

    if (interests) {
      await db.user.update({
        where: {
          id: self?.id,
        },
        data: {
          firstName: toTitleCase(firstName),
          lastName: toTitleCase(lastName),
          dateOfBirth: new Date(dateOfBirth),
          gender,
          grade: toTitleCase(grade),
          schoolId: newSchool?.id,
          interests,
          username,
        },
      });
      const user = await db.user.findUnique({
        where: { id: self?.id },
        select: { email: true, firstName: true, lastName: true },
      });
      let payload = {
        sender: {
          email: "innbrieff@gmail.com",
          name: "Beams",
        },
        subject: "I got it.",
        templateId: 1,
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
            subject: `Welcome ${user?.firstName} , Start Your Inspiring Journey 🌟`,
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
        templateId: 2,
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
            subject: `Explore the Beams Universe: Where Knowledge Meets Fun! 🚀`,
          },
        ],
      };
      await sendEmailBrevo({ payload });
    }
    await db.user.update({
      where: {
        id: self?.id,
      },
      data: {
        firstName: toTitleCase(firstName),
        lastName: toTitleCase(lastName),
        dateOfBirth: new Date(dateOfBirth),
        gender,
        grade: toTitleCase(grade),
        schoolId: newSchool?.id,
        onBoarding: true,
      },
    });
    // const user = await db.user.findUnique({
    //   where: { id: self?.id },
    //   select: { email: true, firstName: true, lastName: true },
    // });
    // const payload = {
    //   sender: {
    //     email: "mudasirpandith789@gmail.com",
    //     name: "Beams",
    //   },
    //   subject: "I got it.",
    //   templateId: 6,
    //   params: {
    //     greeting: "This is my default greeting",
    //     headline: "This is my default headline",
    //   },
    //   messageVersions: [
    //     {
    //       to: [
    //         {
    //           email: user?.email,
    //           name: `${user?.firstName} ${user?.lastName}`,
    //         },
    //       ],
    //       params: {
    //         firstName: user?.firstName,
    //         headline: "Be Ready for Takeoff.",
    //       },
    //       subject: `Profile Updated Successfully`,
    //     },
    //   ],
    // };
    // await sendEmailBrevo({ payload });
    revalidatePath("/home/edit-profile");
    if (interests) redirect("/product-tour");
    return "Changes saved";
  } catch (error) {
    throw error;
  }
};

export const checkUsername = async (
  username: string
): Promise<boolean | null> => {
  try {
    const exists = await db.user.findFirst({
      where: { username },
    });
    if (exists) return true;
    return null;
  } catch (error) {
    throw error;
  }
};

export const getUserForClient = async (): Promise<User | undefined> => {
  try {
    const self = await getAuther();
    if (self) return self as User;
    return undefined;
  } catch (error) {
    throw error;
  }
};
