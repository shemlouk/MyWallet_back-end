import { Request, Response } from "express";
import { USERS } from "../config/database";
import bcrypt from "bcrypt";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

class userController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).json(error.details);
    const duplicate = await USERS.findOne({ email });
    if (duplicate) return res.sendStatus(409);
    USERS.insertOne({ name, email, password: bcrypt.hashSync(password, 10) });
    res.sendStatus(201);
  }
}

export default new userController();
