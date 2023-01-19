import { Request, Response } from "express";
import { recordSchema } from "../schemas";
import { RECORDS } from "../database";

class recordController {
  async create(req: Request, res: Response) {
    const { error } = recordSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).json(error.details);
    RECORDS.insertOne({ ...req.body, user_id: res.locals.userId });
    res.sendStatus(201);
  }
}

export default new recordController();
