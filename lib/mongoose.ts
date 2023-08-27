import mongoose from 'mongoose';

let isConnected = false; //To check if connected to DB

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
    // if (isConnected) return console.log("Already connected to MONGODB");

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true;
        // console.log("Connected to mongodb");
    }
    catch (error) {
        console.log(error);
    }
}