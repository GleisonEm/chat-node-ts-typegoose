import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";
import { ReadMessageService } from "../services/ReadMessageService";

export class MessageController {
    async create(request: Request, response: Response) {
        const { userSendId, conversationId, message } = request.body;
        const service = new CreateMessageService();
        const result = await service.execute({ userSendId, conversationId, message });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
    async find(request: Request, response: Response) {

        const { conversationId } = request.query;
        console.log(conversationId)
        const service = new ReadMessageService();
        const result = await service.execute({ conversationId });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json({"messages":result});
    }
}