import { Router } from "express";
import { MessageController } from "./controllers/MessageController";
import { ConverseController } from "./controllers/ConverseController";

const routes = Router();

routes.post("/converse", new ConverseController().create);
routes.post("/message", new MessageController().create);
routes.get("/message", new MessageController().find);

export { routes };