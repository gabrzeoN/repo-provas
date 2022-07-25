import { Test } from "@prisma/client";
import prisma from "../config/database.js";

export type TestCreationData = Omit<Test, "id">
export type InputData = { teacher: string, category: string, discipline: string } & 
    Omit<Test, "id" | "teacherDisciplineId" | "categoryId">
    
    export async function insert(test:TestCreationData) {
        return await prisma.test.create({data: test});
    }

    export async function getAll() {
        const tests = await prisma.test.findMany();
        return tests;
    }

export async function getAllTermsDisciplines() {
    const terms = await prisma.term.findMany({
        include: {
            disciplines: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return terms;
}

export async function getAllCategories() {
    const categories = await prisma.category.findMany({
        include: {
            tests: {
                select: {
                    id: true,
                    name: true,
                    pdfUrl: true,
                    teacherDisciplineId: false,
                    teacherDiscipline: {
                        select: {
                            teacher: {
                                select: {
                                    name: true
                                }
                            },
                            discipline: {
                                select: {
                                    name: true,
                                    term: {
                                        select: {
                                            number: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return categories;
}

export interface Term {
    id: number;
    number: number;
    disciplines?: [
        {
            id: number,
            name: string
            categories?: Category[]
        }
    ]
}

export interface Category {               
    id: number,
    name: string
    tests?: [
        {
            id?: number;
            name?: string;
            pdfUrl?: string;
            teacherDiscipline?: {
                teacher?: {
                    name?: string;
                }
            }
        }
    ]
}

interface TermCat {   
    id: number;
    number: number;
    disciplines: [
        {
            id: number,
            name: string
            categories: [
                {
                    id: number,
                    name: string
                    provas: [
                        {
                            id: number;
                            name: string;
                            pdfUrl: string;
                            teacher: string;
                        }
                    ]
                }
            ]
        }
    ]
}