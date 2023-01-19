import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.DATABASE_URL ?? "");
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
