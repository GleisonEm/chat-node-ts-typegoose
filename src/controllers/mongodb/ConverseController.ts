import { User } from "../../types/User";
import { Request, Response } from "express";
import { CreateConverseService } from "../../services/mongodb/CreateConverseService";
import { ReadConverseService } from "../../services/mongodb/ReadConverseService";
import { UserService } from "../../services/mysql/UserService";
import { Converse } from "../../entities/mongodb/Converse";
import { User as UserMysql } from "../../entities/mysql/User";

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
  async get(request: Request, response: Response) {
    const { userId }: { userId: string } = request.body;
    const service = new ReadConverseService();
    const result = await service.execute({ userId });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json({ converses: result });
  }
  async find(request: Request, response: Response) {

    const conversationId: string = String(request.params.id);
    const service = new ReadConverseService();
    const result = await service.find({ conversationId });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    const userIds: Array<Number> = result.participants;
    const serviceUserMysql = new UserService();
    const resultUser = await serviceUserMysql.get({ userIds });

    if (resultUser instanceof Error) {
      return response.status(400).json(resultUser.message);
    }


    // console.log(typeof result, typeof resultUser[0], this.makeConverseWithPersonNames(result, resultUser));
    var users: Array<any> = [];
    result.participants.forEach((userId: Number) => {
      const user = resultUser.find((user: UserMysql) => user.id === userId);
      if (user) {
        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        });
      }
    });

    result.participants = users;

    return response.json({ converse: result });
  }
  // makeConverseWithPersonNames(result: any, resultUser: any): Converse {
  //   console.log('entreei aq', result);
  //   result.participants.map((userId: Number) => {
  //     const user = resultUser.find((user: UserMysql) => user.id === userId);
  //     if (user) {
  //       return {
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         phone: user.phone,
  //       };
  //     }
  //   });
  //   console.log('sdadsadsa', resultUser);
  //   return resultUser;
  // }
}
