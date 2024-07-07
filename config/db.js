import mongoose from "mongoose";
import 'dotenv/config';


const connectionString = process.env.Mongo_url


export const dbconnection = () => {
    mongoose.connect(connectionString).then(() => {
        console.log('Database is connected');
    })
}