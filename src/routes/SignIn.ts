import sessionController from "../controllers/sessionController";
import { Router } from "express";

const route = Router();

route.post("/signin", sessionController.create);

export default route;
