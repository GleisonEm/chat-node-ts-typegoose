import { User, UserInfoForConverse } from "../../types/User";
// import { Message as MessageType } from "../../types/Message";
import { Request, Response } from "express";
import { CreateConverseService } from "../../services/mongodb/CreateConverseService";
import { ReadConverseService } from "../../services/mongodb/ReadConverseService";
import { UserService } from "../../services/mysql/UserService";
import { Converse } from "../../entities/mongodb/Converse";
import { User as UserMysql } from "../../entities/mysql/User";
import { Message } from "../../entities/mongodb/Message";
import { TypedRequestQuery } from "../../types/TypedRequestQuery";

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
  async get(request: TypedRequestQuery<{ userId: string, type: string }>, response: Response) {

    const userId: number = parseInt(request.query.userId);
    const type: string = request.query.type;

    const service = new ReadConverseService();
    let converses = await service.get({ userId, type });

    if (converses instanceof Error) {
      return response.status(400).json(converses.message);
    }

    if (type == "converse") {
      let userIds: Array<number> = [];
      converses.forEach((converse: Converse) => {
        userIds = userIds.concat(converse.participants);
      });
      const serviceUserMysql = new UserService();
      const users = await serviceUserMysql.get({ userIds });

      if (users instanceof Error) {
        return response.status(400).json(users.message);
      }

      converses = converses.map((converse: Converse) => {
        return this.makeConverseWithPersonNames(converse, users);
      });
    }

    return response.json({ converses: converses });
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
    converse.participants = converse.participants.map((userId: number, key: number) => {
      const user = users.find((user: UserMysql) => user.id == userId);
      console.log(users, user)
      if (user) {

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        };
      }
    });

    return converse;
  }

  // private makeConverseWithLastMessage(converses: Array<Converse>): Array<Converse> {
  //   converses = converses.map((converse: Converse) => {

  //     return {
  //       ...converse, lastMessage: converse.messages[converse.messages.length - 1]
  //     };

  //   });

  //   return converses;
  // }
  // private makeConverseWithMessagesSendMinutesAgo(converse: Converse): Array<Message> {
  //   const messages: Array<Message> = converse.messages.map((message: Message) => {
  //     var sendAgo = Math.round((Date.now() - Date.parse(message.createdAt.toISOString())) / 60000);

  //     return { ...message, sendAgo }
  //   });

  //   return messages;
  // }
}
