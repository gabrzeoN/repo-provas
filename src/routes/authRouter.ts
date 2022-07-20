import Router from "express";
import validSchema from "../middlewares/validSchemaMiddleware.js";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", validSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validSchema(signInSchema), signIn);

export default authRouter;