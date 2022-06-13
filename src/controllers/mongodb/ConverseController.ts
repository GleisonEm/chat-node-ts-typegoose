import { User, UserInfoForConverse } from "../../types/User";
import { Message as MessageType } from "../../types/Message";
import { Request, Response } from "express";
import { CreateConverseService } from "../../services/mongodb/CreateConverseService";
import { ReadConverseService } from "../../services/mongodb/ReadConverseService";
import { UserService } from "../../services/mysql/UserService";
import { Converse } from "../../entities/mongodb/Converse";
import { User as UserMysql } from "../../entities/mysql/User";
import { Message } from "../../entities/mongodb/Message";

export class ConverseController {
  async create(request: Request, response: Response) {
    const {
      author,
      participants,
      name,
      image,
    }: {
      author: Number;
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
    let converse = await service.find({ conversationId });

    if (converse instanceof Error) {
      return response.status(400).json(converse.message);
    }

    const userIds: Array<Number> = converse.participants;
    const serviceUserMysql = new UserService();
    const users = await serviceUserMysql.get({ userIds });

    if (users instanceof Error) {
      return response.status(400).json(users.message);
    }

    // converse.messages = this.makeConverseWithMessagesSendMinutesAgo(converse);

    return response.json({ converse: this.makeConverseWithPersonNames(converse, users) });
  }
  private makeConverseWithPersonNames(converse: Converse, users: Array<UserMysql>): Converse {
    converse.participants.forEach((userId: number, key: number) => {
      const user = users.find((user: UserMysql) => user.id === userId);
      console.log(users)
      if (user) {
        console.log(user)
        converse.participants[key] = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar
        };
      }
    });

    return converse;
  }
  // private makeConverseWithMessagesSendMinutesAgo(converse: Converse): Array<Message> {
  //   const messages: Array<Message> = converse.messages.map((message: Message) => {
  //     var sendAgo = Math.round((Date.now() - Date.parse(message.createdAt.toISOString())) / 60000);

  //     return { ...message, sendAgo }
  //   });

  //   return messages;
  // }
}
