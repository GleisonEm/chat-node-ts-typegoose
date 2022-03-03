import { Router } from "express";
import { MessageController } from "./controllers/MessageController";

const routes = Router();

routes.post("/message", new MessageController().create);
routes.get("/message", new MessageController().find);

export { routes };