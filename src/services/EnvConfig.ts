import * as dotenv from "dotenv";

export class EnvConfig {
    execute() {
        return dotenv.config();
    }
}