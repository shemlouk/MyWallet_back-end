import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI ?? "");
const db = mongoClient.db();

try {
  const verifyConnection = async () => await db.command({ ping: 1 });
  verifyConnection();
} catch (err) {
  throw err;
}

export const [USERS, RECORDS, SESSIONS] = ["users", "records", "sessions"].map(
  (c) => db.collection(c)
);
