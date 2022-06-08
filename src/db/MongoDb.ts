import mongoose from 'mongoose';
import { EnvConfig } from "../services/EnvConfig";

(new EnvConfig).execute();

export const connectionDatabase = async () => {
    let uri = null;
    const connectionParams = {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: process.env.MONGO_DB_DATABASE,
        user: process.env.MONGO_DB_USERNAME,
        pass: process.env.MONGO_DB_PASSWORD,
        authSource: 'admin'
    };

    // uri = `mongodb://${process.env.HOST}:${process.env.PORT}/${process.env.DB_DATABASE}`;
    uri = 'mongodb://localhost:27017/';

    mongoose.connect(uri, connectionParams)
        .then(() => {
            console.log("MongoDb has been initialized!");
        })
        .catch((err) => {
            console.error("Error during MongoDb initialization", err);
        });
}