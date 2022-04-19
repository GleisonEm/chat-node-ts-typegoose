import { Router } from "express";
import { MessageController } from "./controllers/MessageController";
import { ConverseController } from "./controllers/ConverseController";
import { UserController } from "./controllers/UserController";

const routes = Router();
//Converse
routes.post("/converse", new ConverseController().create);
//User
routes.post("/user", new UserController().create);
//Message
routes.post("/message", new MessageController().create);
routes.get("/message", new MessageController().find);

export { routes };