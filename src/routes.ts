import { Router } from "express";
import { MessageController } from "./controllers/MessageController";
import { UserController } from "./controllers/UserController";

const routes = Router();

//user
routes.post("/user", new UserController().create);
//message
routes.post("/message", new MessageController().create);
routes.get("/message", new MessageController().find);

export { routes };