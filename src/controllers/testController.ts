import { Request, Response } from "express";
import * as testService from "../services/testService.js";
import * as testRepository from "./../repositories/testRepository.js";

export async function createTest(req: Request, res: Response) {
    const test : testRepository.InputData = req.body;
    await testService.createTest(test);
    return res.sendStatus(201);
}

export async function visualizeByDiscipline(req: Request, res: Response) {
    const terms = await testService.visualizeByDiscipline();
    return res.status(200).send({terms});
}

export async function visualizeByTeachers(req: Request, res: Response) {
    const terms = await testService.visualizeByTeachers();
    return res.status(200).send({terms});
}