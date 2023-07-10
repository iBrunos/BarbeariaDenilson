import mongoose from "mongoose";

const connectDatabase = (): void => {
  console.log("Wait connecting to the database...");

  mongoose
    .connect(process.env.MONGODB_URI as string, {
    })
    .then(() => console.log("MongoDB Atlas Connected!"))
    .catch((err: Error) => console.log(`Error connecting to MongoDB Atlas: ${err}`));
};

export default connectDatabase;
