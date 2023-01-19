import sessionAuthentication from "../middlewares/sessionAuthentication";
import recordController from "../controllers/recordController";
import { Router } from "express";

const route = Router();

route.use(sessionAuthentication);

route.post("/record", recordController.create);
route.get("/record", recordController.read);
route.delete("/record/:id", recordController.delete);

export default route;
