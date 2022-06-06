import { MessageModel, Message } from "../../entities/mongodb/Message";
import * as dotenv from "dotenv";
import { Converse, ConverseModel } from "../../entities/mongodb/Converse";

dotenv.config();

type MessageRequest = {
  conversationId: string;
  status?: string;
  converseIds?: Array<String>;
};

export class ReadMessageService {
  async get({ status, converseIds }: MessageRequest): Promise<any | Error> {
    var messages = MessageModel.find();

    if (converseIds) {
      messages = messages.where("conversationId").in(converseIds);
    }

    if (status) {
      console.log("entrei aqaaa", status);
      messages = messages.where("status").ne(status);
    }

    return messages.exec().then(
      (messages) => messages,
      (err) => err
    );
  }
  async find({ conversationId, status }: MessageRequest): Promise<any | Error> {
    var messages = MessageModel.find({
      conversationId: conversationId,
    });

    if (status) {
      console.log("entrei aqaaa", status);
      messages = messages.where("status").ne(status);
    }

    return messages.exec().then(
      (messages) => messages,
      (err) => err
    );
  }
}
