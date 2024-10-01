 import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import { ENV_VARS } from "./envVars.js";

export const connectDB= async ()=>{
    try {
       const conn= await mongoose.connect("mongodb+srv://aasiffilms79:ENNlJQwZc5bF0bpd@cluster0.n8va2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log('MongoDB connected:'+ conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}