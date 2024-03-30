import { SpotTheDifference, SpotTheDifferenceAttempt } from "@prisma/client";
import { db } from "./db";
import { getAuther } from "./getAuther";

export const getAllSpotTheDifference = async (): Promise<
  SpotTheDifference[] | null
> => {
  try {
    const stds = await db.spotTheDifference.findMany({});
    return stds as SpotTheDifference[];
  } catch (error) {
    console.log({ "[Spot the difference]": error });
    throw error;
  }
};

export const getSpotTheDifferenceById = async (
  id: string
): Promise<SpotTheDifference | null> => {
  try {
    const std = await db.spotTheDifference.findUnique({
      where: { id },
      include: { images: { select: { url: true } } },
    });
    if (!std) return null;
    return std as SpotTheDifference;
  } catch (error) {
    console.log({ "[Spot the difference]": error });
    throw error;
  }
};

export const isSpotTheDifferenceAttempt = async (
  id: string
): Promise<SpotTheDifferenceAttempt | null> => {
  try {
    const self = await getAuther();
    const attempt = await db.spotTheDifferenceAttempt.findUnique({
      where: {
        userId_spotTheDifferenceId: {
          spotTheDifferenceId: id,
          userId: self?.id!,
        },
      },
    });

    return attempt as SpotTheDifferenceAttempt;
  } catch (error) {
    console.log({ "[Spot the difference]": error });
    throw error;
  }
};
