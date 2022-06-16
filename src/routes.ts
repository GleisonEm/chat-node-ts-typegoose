import { Router } from "express";
import { MessageController } from "./controllers/mongodb/MessageController";
import { ConverseController } from "./controllers/mongodb/ConverseController";
import { UserController } from "./controllers/mysql/UserController";

const routes = Router();
const converseController = new ConverseController();
//Converse
routes.post("/converses", converseController.create);
routes.get("/converses", converseController.get.bind(converseController));
routes.get("/converses/:id", converseController.find.bind(converseController));
//Message
routes.post("/messages", new MessageController().create);
routes.get("/messages", new MessageController().find);

//mysql

//User
routes.post("/users", new UserController().create);
routes.get("/users", new UserController().get);

export { routes };
