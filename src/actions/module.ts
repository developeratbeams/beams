"use server";
/**
 * Saves module activity for a user.
 * @param moduleId - The ID of the module.
 * @param product - The product to be saved.
 * @returns A string indicating the status of the save operation.
 * @throws Throws an error if there is an issue with the save operation.
 */

import { getAuther } from "@/libs/getAuther";
import { db } from "@/libs/db";
import { revalidatePath } from "next/cache";

export const saveModuleActivity = async (moduleId: string, product: string) => {
  try {
    const self = await getAuther();
    const moduleAttempt = await db.moduleAttempt.findFirst({
      where: {
        moduleId,
        userId: self?.id,
      },
    });
    if (!moduleAttempt?.products.some((prod) => prod === product)) {
      await db.moduleAttempt.updateMany({
        where: {
          moduleId,
          userId: self?.id,
        },
        data: {
          products: {
            push: product,
          },
          noOfProductsDone: Number(moduleAttempt?.noOfProductsDone) + 1,
        },
      });
    }
    revalidatePath("/home");
    revalidatePath("/my-journey");
    return "Saved";
  } catch (error) {
    throw error;
  }
};
