import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

const server = express();
server.use(json());
server.use(cors());

dotenv.config();

server.listen(process.env.PORT, () => {
  console.log("server on air");
});
