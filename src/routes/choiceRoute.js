import { Router } from "express";
import { choiceValidation } from "../middlewares/choiceMiddleware.js";
import { signupChoice, signupVote } from "../controllers/choiceController.js";
//importar controladores e middlewares

const choiceRouter = Router();

choiceRouter.post("/choice", choiceValidation, signupChoice);
choiceRouter.post("/choice/:id/vote", signupVote);

export default choiceRouter;
