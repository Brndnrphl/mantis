import express from "express";
import dotenv from "dotenv";
import routes from "./routes.js";
import process from "process";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config({ path: ".env" });
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/notes", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});

const authenticateToken = (req, res, next) => {
  const token = localStorage.getItem("id_token"); // Bearer TOKEN
  console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
