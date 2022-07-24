import prisma from "../config/database.js";

export async function getByName(name: string) {
    return await prisma.teacher.findUnique({where: {name}});
}

export async function getAll() {
    const teachers = await prisma.teacher.findMany();
    return teachers;
}