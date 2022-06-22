import { TypedRequestQuery } from "@src/types/TypedRequestQuery";
import { Request, Response } from "express";
import { STUDENT } from "../../constants/User";
import { UserService } from "../../services/mysql/UserService";

export class UserController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      phone,
      password,
      type
    }: {
      name: string;
      email: string;
      phone: string;
      password: string;
      type: string;
    } = request.body;
    const service = new UserService();
    const result = await service.create({ name, email, phone, password, type });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
  async get(request: TypedRequestQuery<{ userId: string }>, response: Response) {
    const userId: number = parseInt(request.query.userId);
    const service = new UserService();
    const type: number = STUDENT;
    var paramsService: { type: number, ignoreUserId?: number } = { type: type };

    if (userId) {
      paramsService.ignoreUserId = userId;
    }

    const result = await service.get(paramsService);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({ users: result });
  }
}
