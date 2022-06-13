import "./db/MongoDb";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { routes } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
const morgan = require("morgan");
app.use(morgan('dev'));

export { app };