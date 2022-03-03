import {app} from './app';
import * as dotenv from "dotenv";
dotenv.config();

app.listen(3333, function () {

  console.log('typeof process.env.TYPEORM_PORT');
});