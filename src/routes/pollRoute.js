import { Router } from "express";
import {
  signupPoll,
  getPoll,
  getPollChoices,
} from "../controllers/pollController.js";
import { pollValidation } from "../middlewares/pollMiddleware.js";
//importar controladores e middlewares

const pollRouter = Router();

pollRouter.post("/poll", pollValidation, signupPoll);
pollRouter.get("/poll", getPoll);
pollRouter.get("/poll/:id/choice", getPollChoices);
pollRouter.get("/poll/:id/result");

export default pollRouter;
