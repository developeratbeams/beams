"use server";

import { getAuther } from "@/libs/getAuther";
import { db } from "@/libs/db";
import { revalidatePath } from "next/cache";
import { saveModuleActivity } from "./module";

interface slideProps {
  elementData: string;
  storyId: string;
  url: string;
  pageNo: number;
}
interface slideEnquireData {
  id: string;
  pageNoInUserMadeStory: number;
  storyId: string;
}
export const saveSlide = async ({
  elementData,
  storyId,
  url,
  pageNo,
}: slideProps) => {
  const self = await getAuther();
  if (!self) return null;
  const resumeStory = await db.storySubmission.findFirst({
    where: {
      userId: self.id,
      storyId,
    },
  });
  if (resumeStory) {
    console.log("resume story");
    const editSlide = await db.image.findFirst({
      where: {
        userId: self.id,
        storyId,
        pageNoInUserMadeStory: Number(pageNo),
      },
    });
    if (editSlide) {
      console.log("edit slide");
      await db.image.updateMany({
        where: {
          userId: self.id,
          storyId,
          pageNoInUserMadeStory: Number(pageNo),
        },
        data: {
          url,
          elementData,
        },
      });
    } else {
      console.log("new slide added");
      await db.storySubmission.updateMany({
        where: {
          userId: self.id,
          storyId,
        },
        data: {
          noOfSlideDone: resumeStory.noOfSlideDone + 1,
        },
      });
      await db.image.create({
        data: {
          url,
          elementData,
          pageNoInUserMadeStory: pageNo,
          storyId,
          userId: self.id,
        },
      });
    }
  } else {
    console.log("started the story");
    await db.storySubmission.create({
      data: {
        userId: String(self?.id),
        storyId,
        noOfSlideDone: 0,
        Images: {
          create: {
            url,
            pageNoInUserMadeStory: pageNo,
            elementData,
            storyId,
            userId: self.id,
          },
        },
      },
    });
  }

  revalidatePath(`/stories/1f5926c5-e214-432d-9f14-721de14cf5b8`);
};

export const autoSaveSlide = async ({
  elementData,
  storyId,
  url,
  pageNo,
}: slideProps) => {
  const self = await getAuther();
  if (!self) return;
  const resumeStory = await db.storySubmission.findFirst({
    where: {
      userId: self.id,
      storyId,
    },
  });
  if (resumeStory) {
    console.log("resume story");
    const editSlide = await db.image.findFirst({
      where: {
        userId: self.id,
        storyId,
        pageNoInUserMadeStory: Number(pageNo),
      },
    });
    if (editSlide) {
      console.log("edit slide");
      await db.image.updateMany({
        where: {
          userId: self.id,
          storyId,
          pageNoInUserMadeStory: Number(pageNo),
        },
        data: {
          url,
          elementData,
        },
      });
    } else {
      console.log("new slide added");
      await db.storySubmission.updateMany({
        where: {
          userId: self.id,
          storyId,
        },
        data: {
          noOfSlideDone: resumeStory.noOfSlideDone + 1,
        },
      });
      await db.image.create({
        data: {
          url,
          elementData,
          pageNoInUserMadeStory: pageNo,
          storyId,
          userId: self.id,
        },
      });
    }
  } else {
    console.log("started the story");
    await db.storySubmission.create({
      data: {
        userId: String(self.id),
        storyId,
        noOfSlideDone: 0,
        Images: {
          create: {
            url,
            pageNoInUserMadeStory: pageNo,
            elementData,
            storyId,
            userId: self.id,
          },
        },
      },
    });
  }
  revalidatePath(`/stories/${storyId}`);
  console.log("Auto Saved");
};

export const getSlideEditData = async ({
  id,
  pageNoInUserMadeStory,
  storyId,
}: slideEnquireData) => {
  const self = await getAuther();
  const editData = await db.image.findFirst({
    where: {
      id,
      pageNoInUserMadeStory,
      storyId,
      userId: self?.id,
    },
  });
  const images = await db.image.findMany({
    where: {
      storyId,
      pageNoInUserMadeStory,
    },
  });
  const data = {
    images,
    editData,
  };
  return data;
};

export const finalSubmit = async (storyId: string) => {
  try {
    const self = await getAuther();
    await db.storySubmission.updateMany({
      where: {
        userId: self?.id,
        storyId,
      },
      data: {
        endTime: new Date(),
        status: "DISABLED",
        submissionDate: new Date(),
      },
    });
    const moduleAttempt = await db.moduleAttempt.findFirst({
      where: {
        moduleId: "23390cb6-5f5e-41d1-b637-ad9e42d179c5",
        userId: self?.id,
      },
    });
    if (!moduleAttempt?.products.some((prod) => prod === "WRITER")) {
      await db.user.update({
        where: {
          id: self?.id,
        },
        data: {
          totalScore: Number(self?.totalScore) + 200,
        },
      });
    }
    saveModuleActivity("23390cb6-5f5e-41d1-b637-ad9e42d179c5", "WRITER");
    revalidatePath(`/stories/${storyId}`);
  } catch (error) {
    throw error;
  }
};
