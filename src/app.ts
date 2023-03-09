import express from "express";
import cors from "cors";
import dotenv from "./loadEnv.js";
import orderRouter from "./routers/orderRouter.js";

dotenv();

const server = express();
server.use(express.json());
server.use(cors());
server.use(orderRouter);

server.listen(4000, () => {
  console.log(`server running on port ${4000}`);
});
