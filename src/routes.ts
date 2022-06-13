import { Router } from "express";
import { MessageController } from "./controllers/mongodb/MessageController";
import { ConverseController } from "./controllers/mongodb/ConverseController";
import { UserController } from "./controllers/mysql/UserController";

const routes = Router();
const converseController = new ConverseController();
//Converse
routes.post("/converse", converseController.create);
routes.get("/converse", converseController.get);
routes.get("/converse/:id", converseController.find.bind(converseController));
//Message
routes.post("/message", new MessageController().create);
routes.get("/message", new MessageController().find);

//mysql

//User
routes.post("/user", new UserController().create);
routes.get("/user", new UserController().get);

export { routes };
