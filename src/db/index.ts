import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";
import { Message } from "../entities/Message";
import { Converse } from "../entities/Converse";
import { User } from '../entities/User';

dotenv.config();

export const MongoDbDataSource = new DataSource({
    type: "mongodb",
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    authSource: "admin",
    entities: [User, Message, Converse]
});

MongoDbDataSource.initialize()
    .then(() => {
        console.log("MongoDbDataSource has been initialized!")
    })
    .catch((err) => {
        console.error("Error during MongoDbDataSource initialization", err)
    })