import { ModuleAttempt } from "@/types/user.types";
import { db } from "./db";
import { getAuther } from "./getAuther";
import { Module } from "@prisma/client";
export const getModuleAttempt = async (
  moduleId?: string
): Promise<ModuleAttempt | undefined> => {
  try {
    const self = await getAuther();
    let moduleAttempts;
    moduleAttempts = await db.moduleAttempt.findFirst({
      where: {
        moduleId,
        userId: self?.id,
      },
    });

    if (!moduleAttempts) {
      moduleAttempts = await db.moduleAttempt.create({
        data: {
          userId: self?.id as string,
          noOfProductsDone: 1,
          Module: {
            connect: {
              id: moduleId as string,
            },
          },
        },
      });
    }
    return moduleAttempts as ModuleAttempt;
  } catch (error) {
    throw error;
  }
};

export const getAllModules = async (): Promise<Module[] | undefined> => {
  try {
    const modules = await db.module.findMany({
      take: 5,
      include: { moduleThumnailUrls: { select: { url: true } } },
    });
    return modules as Module[];
  } catch (error) {
    console.log(error);
  }
};
