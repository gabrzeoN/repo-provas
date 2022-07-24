import prisma from "../config/database.js";

export async function getByTeacherDiscipline(teacherId: number, disciplineId: number) {
    return await prisma.teacherDiscipline.findFirst({where: {teacherId, disciplineId}});
}

export async function getAll() {
    const teachDiscs = await prisma.teacherDiscipline.findMany();
    return teachDiscs;
}