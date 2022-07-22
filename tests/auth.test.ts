import supertest from 'supertest';
import userFactory from './factories/authFactory.js';
import prisma from "../src/config/database.js";
import app from '../src/app';
import chalk from "chalk";

beforeEach(async () => {
    await prisma.$executeRaw`DELETE from sessions;`;
    await prisma.$executeRaw`DELETE from users;`;
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
        expect(response.body.token).not.toEqual(null);
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