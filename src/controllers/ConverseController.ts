import { Request, Response } from "express";
import { CreateConverseService } from "../services/CreateConverseService";

export class ConverseController {
    async create(request: Request, response: Response) {
        const {
            author,
            participants,
            name,
            image
        } = request.body;
        const service = new CreateConverseService();
        const result = await service.execute({
            author,
            participants,
            name,
            image
        });

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