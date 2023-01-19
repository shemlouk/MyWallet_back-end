import { Request, Response } from "express";
import { signUpSchema } from "../schemas";
import { USERS } from "../database";
import bcrypt from "bcrypt";

class userController {
  async create(req: Request, res: Response) {
    const { error } = signUpSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).json(error.details);
    const { name, email, password } = req.body;
    const duplicate = await USERS.findOne({ email });
    if (duplicate) return res.sendStatus(409);
    USERS.insertOne({ name, email, password: bcrypt.hashSync(password, 10) });
    res.sendStatus(201);
  }
}

export default new userController();
