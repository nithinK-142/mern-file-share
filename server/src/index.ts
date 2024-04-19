import express from "express";
import cors from "cors";
import router from "./routes/routes";
import dbConnect from "./database/config";
import { CLIENT_URL, PORT } from "./constants";

const app = express();

app.use(express.json());
app.use(cors({ origin: CLIENT_URL, methods: ["POST", "GET"] }));

dbConnect()
  .then(() => {
    app.listen(PORT, () => console.log("⚙️ Server started", PORT));
    app.use("/", router);
  })
  .catch((err) => console.log("❌ERROR ", err.message));

export default app;
