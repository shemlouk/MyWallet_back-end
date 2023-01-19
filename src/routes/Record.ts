import sessionAuthentication from "../middlewares/sessionAuthentication";
import recordController from "../controllers/recordController";
import { Router } from "express";

const route = Router();

route.use(sessionAuthentication);

route.post("/record", recordController.create);

export default route;
