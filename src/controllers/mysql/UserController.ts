import { Request, Response } from "express";
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
  async get(request: Request, response: Response) {
    const service = new UserService();
    const result = await service.ge2t();

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({ users: result });
  }
}
