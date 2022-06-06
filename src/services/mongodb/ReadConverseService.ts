import { MessageModel } from "../../entities/mongodb/Message";
import { ConverseModel, Converse } from "../../entities/mongodb/Converse";

type ConverseRequest = {
  userId: string;
};

export class ReadConverseService {
  async execute({ userId }: ConverseRequest): Promise<Array<Converse> | Error> {
    const converses = await ConverseModel.find()
      .where("participants")
      .in([userId])
      .populate({
        path: "messages",
        model: MessageModel,
        options: {
          limit: 1,
          sort: {
            updatedAt: -1,
          },
        },
      })
      .exec();

    return orderConverses(converses);
  }
}

function orderConverses(converses: Array<Converse>) {
  return converses.sort((actual: Converse, next: Converse) => {
    return (
      next.messages[0].updatedAtToTimestamp -
      actual.messages[0].updatedAtToTimestamp
    );
  });
}
