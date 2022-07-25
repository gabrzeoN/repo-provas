import supertest from 'supertest';
import userFactory from './factories/authFactory.js';
import testFactory from './factories/testFactory.js';
import prisma from "../src/config/database.js";
import app from '../src/app';
import chalk from "chalk";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE from sessions;`;
    await prisma.$executeRaw`DELETE from users;`;
    await prisma.$executeRaw`DELETE from tests;`;
});

describe("POST /sign-up", () => {
    it("given valid inputs, 201", async () => {
        const response = await supertest(app).post("/sign-up").send(userFactory.login);
        expect(response.statusCode).toEqual(201);
    });

    it("given existing email, 409", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const response = await supertest(app).post("/sign-up").send(login);
        expect(response.statusCode).toEqual(409);
    });
    
    it("given invalid email, 422", async () => {
        const response = await supertest(app).post("/sign-up").send(userFactory.wrongLoginEmail);
        expect(response.statusCode).toEqual(422);
    });

    it("given invalid password, 422", async () => {
        const response = await supertest(app).post("/sign-up").send(userFactory.wrongLoginPassword);
        expect(response.statusCode).toEqual(422);
    });
});

describe("POST /sign-in", () => {
    it("given valid inputs, 200", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const response = await supertest(app).post("/sign-in").send(login);
        expect(response.statusCode).toEqual(200);
    });

    it("given valid inputs, token", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const response = await supertest(app).post("/sign-in").send(login);
        const token = response.body.token;
        expect(token).not.toEqual(undefined);
        expect(token).not.toEqual(null);
    });

    it("given wrong email, 401", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const response = await supertest(app).post("/sign-in").send({...login, email: "a@a.com"});
        expect(response.statusCode).toEqual(401);
    });

    it("given wrong password, 401", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const response = await supertest(app).post("/sign-in").send({...login, password: "abc"});
        expect(response.statusCode).toEqual(401);
    });
});

describe("POST /test", () => {
    it("given valid inputs, 201", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const loginData = await supertest(app).post("/sign-in").send(login);
        const token = loginData.body.token;
        const test = testFactory.test;
        const response = await supertest(app).post("/test").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(201);
    });

    it("given non-existing category, 404", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const loginData = await supertest(app).post("/sign-in").send(login);
        const token = loginData.body.token;
        const test = testFactory.categoryDoesNotExist;
        const response = await supertest(app).post("/test").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(404);
    });

    it("given non-existing discipline, 404", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const loginData = await supertest(app).post("/sign-in").send(login);
        const token = loginData.body.token;
        const test = testFactory.disciplineDoesNotExist;
        const response = await supertest(app).post("/test").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(404);
    });

    it("given non-existing teacher, 404", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const loginData = await supertest(app).post("/sign-in").send(login);
        const token = loginData.body.token;
        const test = testFactory.teacherDoesNotExist;
        const response = await supertest(app).post("/test").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(404);
    });

    it("given a discipline and a teacher that doesn't lectures it, 409", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const loginData = await supertest(app).post("/sign-in").send(login);
        const token = loginData.body.token;
        const test = testFactory.teacherDoesNotLecturesDiscipline;
        const response = await supertest(app).post("/test").send(test).set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(409);
    });
});

describe("GET /test", () => {
    it("get tests organized by disciplines, 200", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const loginData = await supertest(app).post("/sign-in").send(login);
        const token = loginData.body.token;
        const test = testFactory.test;
        await supertest(app).post("/test").send(test).set("Authorization", `Bearer ${token}`);
        const response = await supertest(app).get("/test/disciplines").set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
    });

    it("get tests organized by teachers, 200", async () => {
        const login = userFactory.login;
        await supertest(app).post("/sign-up").send(login);
        const loginData = await supertest(app).post("/sign-in").send(login);
        const token = loginData.body.token;
        const test = testFactory.test;
        await supertest(app).post("/test").send(test).set("Authorization", `Bearer ${token}`);
        const response = await supertest(app).get("/test/teachers").set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});