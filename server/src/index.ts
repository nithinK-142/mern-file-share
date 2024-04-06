import express from "express";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);

app.use("/", () => console.log("SERVER STARTED"));

app.listen(PORT, () => console.log("SERVER STARTED"));

export default app;
