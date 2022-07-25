import * as testRepository from "./../repositories/testRepository.js";
import * as termRepository from "./../repositories/termRepository.js";
import * as teacherRepository from "./../repositories/teacherRepository.js";
import * as categoryRepository from "./../repositories/categoryRepository.js";
import * as disciplineRepository from "./../repositories/disciplineRepository.js";
import * as teacherDisciplineRepository from "./../repositories/teacherDisciplineRepository.js";
import { Category, TeacherDiscipline } from "@prisma/client";

async function teacherMustExist(name: string) {
    const teacher = await teacherRepository.getByName(name);
    if(!teacher){
        throw {type: "notFound", message: "This teacher is not register!"};
    }
    return teacher;
}

async function categoryMustExist(name: string) {
    const category = await categoryRepository.getByName(name);
    if(!category){
        throw {type: "notFound", message: "This category is not register!"};
    }
    return category;
}

async function disciplineMustExist(name: string) {
    const discipline = await disciplineRepository.getByName(name);
    if(!discipline){
        throw {type: "notFound", message: "This discipline is not register!"};
    }
    return discipline;
}

async function teacherMustLectureSubject(teacherId: number, disciplineId: number) {
    const teacherDiscipline = await teacherDisciplineRepository.getByTeacherDiscipline(teacherId, disciplineId);
    if(!teacherDiscipline){
        throw {type: "conflict", message: "This teacher doesn't lectures this discipline!"};
    }
    return teacherDiscipline;
}

function mountInsetionData(newTest: testRepository.InputData, category: Category, teacherDiscipline: TeacherDiscipline){
    const testInsertionData = {
        name: newTest.name,
        pdfUrl: newTest.pdfUrl,
        categoryId: category.id,
        teacherDisciplineId: teacherDiscipline.id
    };
    return testInsertionData;
}

export async function createTest(newTest: testRepository.InputData ) {
    const teacher = await teacherMustExist(newTest.teacher);
    const category = await categoryMustExist(newTest.category);
    const discipline = await disciplineMustExist(newTest.discipline);
    const teacherDiscipline = await teacherMustLectureSubject(teacher.id, discipline.id);
    const newTestInsertData = mountInsetionData(newTest, category, teacherDiscipline);
    await testRepository.insert(newTestInsertData);
    return;
}

function removeTeacherDiscipline(categories){
    categories.map((category) => {
        category.tests?.map((test) => {
            test.teacher = test?.teacherDiscipline?.teacher?.name;
            test.discipline = test?.teacherDiscipline?.discipline?.name;
            test.term = test.teacherDiscipline?.discipline?.term?.number;
            delete test?.teacherDiscipline;
        });
    });
    return categories;
}

function joinTestCategory(categories){
    const tests = [];
    for(let i = 0; i < categories.length; i++){
        for(let j = 0; j < categories[i].tests.length; j++){
            tests.push({
                ...categories[i].tests[j],
                category: categories[i]?.name
            });
        }
    }
    return tests;
}

function joinTermCategory(terms, categories){
    const tests = [];
    for(let i = 0; i < categories.length; i++){
        for(let j = 0; j < categories[i].tests.length; j++){
            
        }
    }
    return tests;
}

export async function visualizeByDiscipline() {
    // const terms = await testRepository.getAllTermsDisciplines();
    const categories = await testRepository.getAllCategories();
    removeTeacherDiscipline(categories);
    const tests = joinTestCategory(categories);
    return tests;
}

export async function visualizeByTeachers() {
        return await visualizeByDiscipline();
    }