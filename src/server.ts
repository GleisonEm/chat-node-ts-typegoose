import {app} from "./app";
import * as dotenv from "dotenv";
import { connectionDatabase } from "./db/index";
dotenv.config();

connectionDatabase();

app.listen(3333, function () {
  console.log('server on');
});