import { Request, Response } from "express";
import * as testService from "../services/testService.js";
import * as testRepository from "./../repositories/testRepository.js";

export async function createTest(req: Request, res: Response) {
    const test : testRepository.InputData = req.body;
    await testService.createTest(test);
    return res.sendStatus(201);
}

export async function visualizeByDiscipline(req: Request, res: Response) {
    const tests = await testService.visualizeByDiscipline();
    return res.status(200).send({tests});
}

export async function visualizeByTeachers(req: Request, res: Response) {
    const tests = await testService.visualizeByTeachers();
    return res.status(200).send({tests});
}