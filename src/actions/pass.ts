"use server";

import { db } from "@/libs/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const savePassCode = async (passcode: string) => {
  try {
    const { userId } = auth();
    if (!userId) return null;
    const pass = await db.passCode.findUnique({
      where: {
        passcode,
      },
    });
    if (!pass || pass.status === "DISABLED") {
      return new Error("Invalid Passcode");
    }
    await db.passCode.update({
      where: {
        passcode,
      },
      data: {
        noOfPasses: pass.noOfPasses - 1,
        status: pass.noOfPasses - 1 === 0 ? "DISABLED" : "ACTIVE",
      },
    });
    await db.passcodeUser.create({
      data: {
        passcodeId: pass.id,
        userId,
      },
    });
    revalidatePath("/get-started");
    return "Saved";
  } catch (error) {
    throw error;
  }
};

export const userPassAllowed = async () => {
  try {
    const { userId } = auth();
    if (!userId) return null;
    const passcode = await db.passcodeUser.findFirst({
      where: {
        userId,
      },
    });
    return !!passcode;
  } catch (error) {
    throw error;
  }
};
