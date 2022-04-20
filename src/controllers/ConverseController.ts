import { User } from "../types/User";
import { Request, Response } from "express";
import { CreateConverseService } from "../services/CreateConverseService";
import { ReadConverseService } from "../services/ReadConverseService";

export class ConverseController {
  async create(request: Request, response: Response) {
    const {
      author,
      participants,
      name,
      image,
    }: {
      author: string;
      participants: Array<User>;
      name?: string;
      image?: string;
    } = request.body;
    const service = new CreateConverseService();
    const result = await service.execute({
      author,
      participants,
      name,
      image,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
  async find(request: Request, response: Response) {
    const { userId }: { userId: string } = request.body;
    const service = new ReadConverseService();
    const result = await service.execute({ userId });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({ converses: result });
  }
}
