import { Test } from "@prisma/client";
import prisma from "../config/database.js";

export type TestCreationData = Omit<Test, "id">
export type InputData = { teacher: string, category: string, discipline: string } & 
    Omit<Test, "id" | "teacherDisciplineId" | "categoryId">

export async function getAllByTerms() {
    const terms = await prisma.term.findMany({
        include: {
            disciplines: {
                include: {
                    teachersDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
                                include: {
                                    category: true,
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return terms;
}

export async function getAllByTeachers() {
    const teachers = await prisma.teacher.findMany({
        include: {
            teachersDisciplines: {
                include: {
                    tests: {
                        include: {
                            category: true
                        }
                    },
                    discipline: {
                        include: {
                            term: true
                        }
                    }
                }
            }
        }
    });
    return teachers;
}

export async function insert(test:TestCreationData) {
    return await prisma.test.create({data: test});
}

const terms = [
    {   
        id: 1,
        number: 1,
        disciplines: [
            {
                id: 1,
                name: "Javascript",
                categories: [
                    {
                        id: 1,
                        name: "Projeto",
                        provas: [
                            {
                                id: 1,
                                name: "prova mais dificil",
                                pdfUrl: "https://...",
                                teacher: "Diego"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

const teachers = [
    {   
        id: 1,
        name: "Diego",
        categories: [
            {
                id: 1,
                name: "Projeto",
                provas: [
                    {
                        id: 1,
                        name: "prova mais dificil",
                        pdfUrl: "https://...",
                        teacher: "Diego",
                        disciplines: [
                            {
                                id: 1,
                                name: "Javascript",
                            }
                        ]
                    }
                ]
            }
        ]
    }
]