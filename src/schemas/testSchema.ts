import joi from "joi";
import { InputData } from "../repositories/testRepository";

export const creationSchema = joi.object<InputData>({
    name: joi.string().max(30).required(),
    pdfUrl: joi.string().uri().max(1000).required(),
    category: joi.string().max(30).required(),
    discipline: joi.string().max(30).required(),
    teacher: joi.string().max(30).required()
});
