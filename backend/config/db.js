import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;


// mongodb+srv://aakashkumar0728_db_user:hjzLLJZ5Dn1xPtEw@cluster0.4orvgem.mongodb.net/