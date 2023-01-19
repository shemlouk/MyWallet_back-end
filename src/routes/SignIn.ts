import sessionController from "../controllers/sessionController";
import { Router } from "express";

const route = Router();

route.post("/signin", sessionController.create);
route.delete("/signin", sessionController.delete);

export default route;
