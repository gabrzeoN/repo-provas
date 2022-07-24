import prisma from "../config/database.js";

export async function getByName(name: string) {
    return await prisma.category.findUnique({where: {name}});
}

export async function getAll() {
    const categories = await prisma.category.findMany();
    return categories;
}