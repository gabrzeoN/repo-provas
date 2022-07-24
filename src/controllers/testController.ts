import { Request, Response } from "express";
import * as testService from "../services/testService.js";
import * as testRepository from "./../repositories/testRepository.js";

export async function createTest(req: Request, res: Response) {
    const test : testRepository.InputData = req.body;
    await testService.createTest(test);
    return res.sendStatus(201);
}