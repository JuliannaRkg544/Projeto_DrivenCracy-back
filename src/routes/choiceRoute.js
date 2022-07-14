import { Router } from "express";
import { choiceValidation } from "../middlewares/choiceMiddleware.js";
import signupChoice from "../controllers/choiceController.js";
//importar controladores e middlewares

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidation, signupChoice);
choiceRouter.post("/choice/:id/vote");

export default choiceRouter;
