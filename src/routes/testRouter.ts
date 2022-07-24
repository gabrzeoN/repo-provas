import Router from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { creationSchema } from "../schemas/testSchema.js";
import { createTest } from "../controllers/testController.js";
import { validToken } from "../middlewares/validTokenMiddleware.js";

const testRouter = Router();

testRouter.post("/test", validSchema(creationSchema), validToken, createTest);

export default testRouter;