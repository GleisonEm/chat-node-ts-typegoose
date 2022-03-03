import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class UserController {
    async create(request: Request, response: Response) {
        const { username, email, password } = request.body;
        const service = new CreateUserService();
        const result = await service.execute({ username, email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
    // async find(request: Request, response: Response) {
    //     const { _id } = request.body;
    //     const service = new ReadEncryptService();
    //     const result = await service.execute({ _id });

    //     if (result instanceof Error) {
    //         return response.status(400).json(result.message);
    //     }

    //     return response.json(result);
    // }
}