import { MongoDbDataSource } from "../db/index";
import * as dotenv from "dotenv";
import { User } from 'src/types/User';
import { Converse } from "../entities/Converse";

dotenv.config();

type ConverseRequest = {
    author: string;
    participants: Array<User>;
    name?: string;
    image?: string;
};

export class CreateConverseService {
    async execute({
        author,
        participants,
        name,
        image
    }: ConverseRequest): Promise<Converse | Error> {
        const converseRepository = MongoDbDataSource.getRepository(Converse);
        // const messages = await messageRepository.find({ conversationId });

        // if (!messages) {
        //     return new Error('Não existem messagem');
        // }

        const converseCreate = converseRepository.create({
            author: author,
            participants: participants,
            name: name,
            image: image
        });

        await converseRepository.save(converseCreate);

        return converseCreate;
    }

}