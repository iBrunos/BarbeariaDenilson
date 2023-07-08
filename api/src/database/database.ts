import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
const MONGODB_URI = "mongodb+srv://root:root@cluster0.s5ltlek.mongodb.net/?retryWrites=true&w=majority";

dotenv.config();
console.log(MONGODB_URI)
let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) {
    return db;
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI);
    db = client.db();
    console.log("MongoDB Atlas connected")
    return db;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
};