import { Message, MessageModel } from "../entities/Message";

type MessageRequest = {
    userSendId: string;
    conversationId: string;
    message: string;
};

export class CreateMessageService {
    async execute({
        userSendId,
        conversationId,
        message
    }: MessageRequest): Promise<Message | Error> {

        const messageCreate = new MessageModel({
            userSendId,
            message,
            conversationId
        });

        await messageCreate.save();

        return messageCreate;
    }
}