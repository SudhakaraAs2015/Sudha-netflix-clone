import express from 'express';
import dotenv  from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import authRoutes from  '../backend/routes/authRoutes.js'
import movieRoutes from  '../backend/routes/movieRoutes.js'
import tvRoutes from  '../backend/routes/tvRoutes.js'
import searchRoutes from  '../backend/routes/searchRoutes.js'
import connectDB from './config/db.js';
import { protectRoutes } from './middleware/protectRoutes.js';
import { ENV_VARS } from './config/envVars.js';

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

;const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/movie',protectRoutes,movieRoutes);
app.use('/api/v1/tv',protectRoutes,tvRoutes);
app.use('/api/v1/search',protectRoutes,searchRoutes);

if(ENV_VARS.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}


app.listen(PORT, ()=>{
    console.log(`Sudha's Server is Running on Port ${PORT}`);
});