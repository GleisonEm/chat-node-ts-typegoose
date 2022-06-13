import { Request, Response } from "express";
import { CreateMessageService } from "../../services/mongodb/CreateMessageService";
import { ReadMessageService } from "../../services/mongodb/ReadMessageService";

export class MessageController {
  async create(request: Request, response: Response) {
    const {
      userSendId,
      conversationId,
      uniqueId,
      message,
    }: {
      userSendId: string;
      message: string;
      uniqueId: string;
      conversationId: string;
    } = request.body;
    const service = new CreateMessageService();
    const result = await service.execute({
      userSendId,
      conversationId,
      uniqueId,
      message,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
  async find(request: Request, response: Response) {
    const {
      conversationId,
      status,
      converseIds,
    }: {
      conversationId: string;
      status?: string;
      converseIds?: Array<String>;
    } = request.body;

    const service = new ReadMessageService();
    const result = await service.get({ conversationId, status, converseIds });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({
      messages: result,
    });
  }
}
