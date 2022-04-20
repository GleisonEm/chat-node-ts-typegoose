import { MongoDbDataSource } from "../db/index";
import { Message } from "../entities/Message";
import * as dotenv from "dotenv";

dotenv.config();

type MessageRequest = {
  conversationId: string;
};

export class ReadMessageService {
  async execute({
    conversationId,
  }: MessageRequest): Promise<Array<Message> | Error> {
    console.log("entrei aq", conversationId);
    const messageRepository = MongoDbDataSource.getRepository(Message);
    const messages = await messageRepository.findBy({
      conversationId: conversationId,
    });

    return messages;
  }
}
