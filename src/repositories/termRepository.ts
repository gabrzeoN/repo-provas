import prisma from "../config/database.js";

export async function getByNumber(number: number) {
    return await prisma.term.findUnique({where: {number}});
}

export async function getAll() {
    const terms = await prisma.term.findMany();
    return terms;
}