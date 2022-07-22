import joi from "joi";
import { InputData } from "../repositories/testRepository";

export const creationSchema = joi.object<InputData>({
    // name: joi.string().required(),
    // pdfUrl: joi.string().uri().required(),
    // category: joi.string().valid('Projeto', 'Prática', 'Recuperação').required(),
    // discipline: joi.string().required(),
    // teacher: joi.string().required()
});
