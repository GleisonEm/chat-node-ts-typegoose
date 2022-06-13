import { app } from "./app";
import * as dotenv from "dotenv";
import { connectionDatabase } from "./db/MongoDb";
dotenv.config();

connectionDatabase();

app.listen(3340, function () {
  console.log('server on');
});