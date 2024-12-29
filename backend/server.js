import express from 'express';
import dotenv  from 'dotenv';
import cors from 'cors';
import authRoutes from  '../backend/routes/authRoutes.js'
import connectDB from './config/db.js';

const app = express();
dotenv.config();
connectDB()
app.use(cors())
app.use(express.json())

;const PORT = process.env.PORT || 5000;

app.use('/api/v1/auth',authRoutes)
app.listen(PORT, ()=>{
    console.log(`Sudha's Server is Running on Port ${PORT}`);
})