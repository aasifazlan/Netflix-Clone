 import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import { ENV_VARS } from "./envVars.js";

export const connectDB= async ()=>{
    try {
       const conn= await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected:'+ conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}