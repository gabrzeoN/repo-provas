import { Test } from "@prisma/client";
import prisma from "../config/database.js";

export type TestCreationData = Omit<Test, "id">
export type InputData = { teacher: string, category: string } & 
    Omit<Test, "id" | "teacherDisciplineId" | "categoryId">

// export async function getUserByEmail(email:string) {
//     const user = await prisma.user.findUnique({where: {email}});
//     return user;
// }

export async function insert(test:TestCreationData) {
    return await prisma.test.create({data: test});
}