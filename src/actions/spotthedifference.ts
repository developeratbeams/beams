"use server";
/**
 * Saves the attempt for the Spot the Difference game.
 * @param {Object} body - The request body.
 * @param {string} body.id - The ID of the Spot the Difference game.
 * @param {any} body.spottedDifferences - The spotted differences in the game.
 * @returns {Promise<void>} - A promise that resolves when the attempt is saved.
 */

import { getAuther } from "@/libs/getAuther";
import { db } from "@/libs/db";

interface Body {
  id: string;
  spottedDifferences: any;
}
export const saveAttemptSpotTheDifference = async ({
  id,
  spottedDifferences,
}: Body) => {
  try {
    const self = await getAuther();
    if (!self || !self.id) return null;
    const alreadySaved = await db.spotTheDifferenceAttempt.findUnique({
      where: {
        userId_spotTheDifferenceId: {
          userId: self.id!,
          spotTheDifferenceId: id,
        },
      },
    });
    if (!alreadySaved)
      await db.spotTheDifferenceAttempt.create({
        data: {
          userId: self.id!,
          spotTheDifferenceId: id,
          spottedDifferences,
        },
      });
  } catch (error) {
    console.log({ "[Error in saving STD]: ": error });
  }
};
