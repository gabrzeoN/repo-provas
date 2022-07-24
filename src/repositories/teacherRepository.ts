import prisma from "../config/database.js";

export async function getByName(name: string) {
    return await prisma.teacher.findUnique({where: {name}});
}