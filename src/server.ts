import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Record from "./routes/Record";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(SignUp);
app.use(SignIn);
app.use(Record);

app.listen(process.env.PORT ?? "0", () => {
  console.log("Server is running");
});
