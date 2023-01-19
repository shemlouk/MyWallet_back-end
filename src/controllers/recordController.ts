import { Request, Response } from "express";
import { recordSchema } from "../schemas";
import { RECORDS } from "../database";

class recordController {
  async create(req: Request, res: Response) {
    const { error } = recordSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).json(error.details);
    try {
      RECORDS.insertOne({ ...req.body, user_id: res.locals.userId });
      res.sendStatus(201);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async read(req: Request, res: Response) {
    try {
      const records = await RECORDS.find({
        user_id: res.locals.userId,
      }).toArray();
      res.send(records);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new recordController();
