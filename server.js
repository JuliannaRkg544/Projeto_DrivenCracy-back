import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pollRouter from "./src/routes/pollRoute.js";
import choiceRouter from "./src/routes/choiceRoute.js";

const server = express();
server.use(json());
server.use(cors());

server.use(pollRouter);
server.use(choiceRouter);

dotenv.config();

server.listen(process.env.PORT, () => {
  console.log("server on air");
});
