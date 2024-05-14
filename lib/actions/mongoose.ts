// Mongoose help making connection to MongoDB database

import mongoose from 'mongoose';

let isConnected = false; //Var to track the connection status

export const connectToDB = async () => {
    // First set mongoose strict mode to prevent unknown field queries
    mongoose.set('strictQuery', true);

    // Next ensuring mongoDB have URI meaning a connection to our DB
    if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

    if (isConnected) return console.log('=> using existing database connection');


    // Created an account on MongoDB.com/atlas in order to get access on MongoDB URI of the database that we need to connect to.
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('MongoDB Connected');

    } catch (error) {
        console.log(error)
    }
}