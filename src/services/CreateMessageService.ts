import { MongoDbDataSource } from "../db/index";
import { Message } from "../entities/Message";
import * as dotenv from "dotenv";

dotenv.config();

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
        const messageRepository = MongoDbDataSource.getRepository(Message);
        // const messages = await messageRepository.find({ conversationId });

        // if (!messages) {
        //     return new Error('Não existem messagem');
        // }

        const messageCreate = messageRepository.create({
            userSendId,
            message,
            conversationId
        });

        await messageRepository.save(messageCreate);

        return messageCreate;
    }

}