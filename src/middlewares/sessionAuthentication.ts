import { Request, Response, NextFunction } from "express";
import { SESSIONS } from "../database";

async function sessionAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.get("authorization")?.replace(/(Bearer )/g, "");
  if (!token) return res.sendStatus(401);
  try {
    const session = await SESSIONS.findOne({ token: token });
    if (!session) return res.sendStatus(404);
    res.locals.token = { token };
    res.locals.userId = session.user_id;
  } catch (err) {
    res.status(500).json(err);
  }
  next();
}

export default sessionAuthentication;
