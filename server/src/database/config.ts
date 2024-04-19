import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("🗃️ Database connected");
  } catch (error: any) {
    console.log("❌ Error while connecting with the database ", error.message);
  }
}

export default dbConnect;
