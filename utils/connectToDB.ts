import mongoose from "mongoose";

let isConnected = false;
const uri = process.env.MONGO_URI;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(uri!);

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("error connecting to mongodb: ", error);
  }
};
