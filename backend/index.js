import express from "express";
import dotenv from "dotenv";
import routes from "./routes.js";
import process from "process";
import cors from "cors";

dotenv.config({ path: ".env" });
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/notes", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});
