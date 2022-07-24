import prisma from "../config/database.js";

export async function getByName(name: string) {
    return await prisma.discipline.findUnique({where: {name}});
}

export async function getAll() {
    const disciplines = await prisma.discipline.findMany();
    return disciplines;
}