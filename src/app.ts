import express from "express";
import cors from "cors";
import dotenv from "./loadEnv.js";

dotenv();

const server = express();
server.use(express.json());
server.use(cors());

server.listen(4000, () => {
  console.log(`server running on port ${4000}`);
});