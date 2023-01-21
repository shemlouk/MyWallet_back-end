import { Request, Response } from "express";
import { recordSchema } from "../schemas";
import { RECORDS } from "../database";
import { ObjectId } from "mongodb";

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
      })
        .sort({ date: 1 })
        .toArray();
      res.send(records);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async delete(req: Request, res: Response) {
    if (req.params.id.length !== 24) return res.sendStatus(422);
    try {
      const query = {
        $and: [
          { _id: new ObjectId(req.params.id) },
          { user_id: res.locals.userId },
        ],
      };
      const { deletedCount } = await RECORDS.deleteOne(query);
      if (!deletedCount) return res.sendStatus(404);
      res.sendStatus(200);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new recordController();
