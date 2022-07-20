import joi from "joi";
import { UserSignUpData, UserSignInData } from "../repositories/authRepository.js";

export const signInSchema = joi.object<UserSignUpData>({
    email: joi.string().trim().email().required(),
    password: joi.string().required()
});

export const signUpSchema = joi.object<UserSignInData>({
    email: joi.string().email().trim().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{10,30}$')).required()
});