import { MessageModel, Message } from "../entities/Message";
import * as dotenv from "dotenv";
import { Converse, ConverseModel } from "../entities/Converse";

dotenv.config();

type MessageRequest = {
  conversationId: string;
};

export class ReadMessageService {
  async execute({ conversationId }: MessageRequest): Promise<any | Error> {
    console.log("entrei aq", conversationId);

    const messages = await MessageModel.findOne({
      conversationId: conversationId,
    })
      .populate({ path: 'conversationId', model: ConverseModel })
      .exec();

    return messages;
  }
}
