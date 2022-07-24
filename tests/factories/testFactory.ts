import { faker } from "@faker-js/faker";


const test = {
    name: faker.lorem.sentence(2),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    discipline: "JavaScript",
    teacher: "Diego Pinho"
};

const categoryDoesNotExist = {
    name: faker.lorem.sentence(1),
    pdfUrl: faker.internet.url(),
    category: "fakeCategory",
    discipline: "JavaScript",
    teacher: "Diego Pinho"
};

const disciplineDoesNotExist = {
    name: faker.lorem.sentence(2),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    discipline: "fakeDiscipline",
    teacher: "Diego Pinho"
};

const teacherDoesNotExist = {
    name: faker.lorem.sentence(2),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    discipline: "JavaScript",
    teacher: "fakeTeacher"
};

const teacherDoesNotLecturesDiscipline = {
    name: faker.lorem.sentence(2),
    pdfUrl: faker.internet.url(),
    category: "Projeto",
    discipline: "Humildade",
    teacher: "Diego Pinho"
};

const testFactory = {
    test,
    categoryDoesNotExist,
    disciplineDoesNotExist,
    teacherDoesNotExist,
    teacherDoesNotLecturesDiscipline
};

export default testFactory;