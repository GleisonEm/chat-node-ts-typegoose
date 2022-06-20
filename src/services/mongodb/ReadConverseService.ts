import { MessageModel } from "../../entities/mongodb/Message";
import { ConverseModel, Converse } from "../../entities/mongodb/Converse";

type ConverseRequest = {
  userId: number;
  type?: string;
};

type ConverseFindRequest = {
  conversationId: string;
};

export class ReadConverseService {
  async get({ userId, type }: ConverseRequest): Promise<Array<Converse> | Error> {
    let converses = ConverseModel.find();

    if (type) {
      converses = converses.where('type').equals(type);
    }

    return converses.where('participants')
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
      }).lean().exec()
      .then(
        (converses) => converses,
        (err) => err
      );
    // return orderConverses(converses);
  }
  async find({ conversationId }: ConverseFindRequest): Promise<Converse | Error> {
    const converse = ConverseModel.findById(conversationId)
      .populate({
        path: "messages",
        model: MessageModel,
        options: {
          sort: {
            updatedAt: -1,
          },
        },
      }).lean();

    // return converse;

    return converse.exec().then(
      (converse) => converse,
      (err) => err
    );
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
