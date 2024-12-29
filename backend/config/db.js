import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();



const connectDB = async()=>{
    
    try{
        await mongoose.connect(process.env.MONGO_URI);
        

        console.log(`Sudha's MongoDB is Connected`);
    }
    catch(error){
        console.log(`MOngoDB Connection Failed Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;