import express from "express";
import "express-async-errors";
import cors from "cors";

import handleError from "./middlewares/errorHandlerMiddleware.js";
import router from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleError);

export default app;