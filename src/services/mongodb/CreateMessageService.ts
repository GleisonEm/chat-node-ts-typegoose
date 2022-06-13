import { Message, MessageModel } from "../../entities/mongodb/Message";

type MessageRequest = {
  userSendId: string;
  conversationId: string;
  uniqueId: string;
  message: string;
};

export class CreateMessageService {
  async execute({
    userSendId,
    conversationId,
    uniqueId,
    message,
  }: MessageRequest): Promise<Message | Error> {
    const messageCreate = new MessageModel({
      userSendId,
      uniqueId,
      message,
      conversationId,
    });

    await messageCreate.save();

    return messageCreate;
  }
}
