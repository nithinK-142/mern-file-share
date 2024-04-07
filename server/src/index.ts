import express from "express";
import cors from "cors";
import router from "./routes/routes";
import DBConnection from "./database/database";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET"],
  })
);

app.use("/", router);

DBConnection();

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
