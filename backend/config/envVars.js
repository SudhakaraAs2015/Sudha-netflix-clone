import dotenv from'dotenv';

dotenv.config();

export const ENV_VARS ={
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
    NODE_ENV : process.env.NODE_ENV,
}