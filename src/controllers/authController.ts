import { Request, Response } from "express";
import * as authService from "../services/authService.js";
import * as authRepository from "./../repositories/authRepository.js";

export async function signUp(req: Request, res: Response) {
    const { email, password } : authRepository.UserSignUpData = req.body;
    await authService.signUp({ email, password });
    return res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const { email, password } : authRepository.UserSignInData = req.body;
    const token = await authService.signIn({ email, password });
    return res.status(200).send(token);
}