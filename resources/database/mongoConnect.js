import mongoose from "mongoose";
import config from "config";
mongoose.set("strictQuery", false);
const dbUrl = config.get("mongo.url");
const connection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};
export default connection;
