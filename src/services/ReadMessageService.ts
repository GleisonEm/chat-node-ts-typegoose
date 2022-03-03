import { getRepository } from "typeorm";
import { Message } from "../entities/Message";
import * as dotenv from "dotenv";

dotenv.config();

type MessageRequest = {
    conversationId: string;
};

export class ReadMessageService {
    async execute({
        conversationId
    }: MessageRequest): Promise<Array<Message> | Error> {
        console.log('entrei aq')
        const messageRepository = getRepository(Message);
        const messages = await messageRepository.find({ conversationId });

        return messages;
    }
}