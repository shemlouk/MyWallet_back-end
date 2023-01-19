import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import SignUp from "./routes/SignUp";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(SignUp);

app.listen(process.env.PORT ?? "0", () => {
  console.log("Server is running");
});
