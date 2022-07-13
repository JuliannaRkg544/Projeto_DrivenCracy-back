import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let db = null;
const mongo = new MongoClient(process.env.MONGO_URI);

try {
  await db.connect();
  db = mongo.db(process.env.BANCO);
  console.log("conected to database");
} catch (error) {
  console.log(error);
}

export default db;
