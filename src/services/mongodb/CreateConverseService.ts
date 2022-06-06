import { User } from "src/types/User";
import { ConverseModel, Converse } from "../../entities/mongodb/Converse";

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
    image,
  }: ConverseRequest): Promise<Converse | Error> {
    const converseCreate = new ConverseModel({
      author: author,
      participants: participants,
      name: name,
      image: image,
    });

    await converseCreate.save();

    return converseCreate;
  }
}
