import * as dotenv from "dotenv";
import { Converse } from "../entities/Converse";
import { MongoDbDataSource } from "../db/index";
import { Message } from "../entities/Message";

dotenv.config();

type ConverseRequest = {
  userId: string;
};

export class ReadConverseService {
  async execute({ userId }: ConverseRequest): Promise<any | Error> {
    const converseRepository = MongoDbDataSource.getMongoRepository(Converse);
    // const converses = await converseRepository.findBy({
    //   participants: {
    //     $in: [userId],
    //   },
    // });

    const converses = await converseRepository.aggregate([
      {
        $lookup: {
          from: "messages",
          localField: "conversationId",
          foreignField: "_id",
          as: "converse",
        },
      },
    ]).toArray();

    return converses;
  }
}
