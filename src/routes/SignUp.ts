import userController from "../controllers/userController";
import { Router } from "express";

const route = Router();

route.post("/signup", userController.create);

export default route;
