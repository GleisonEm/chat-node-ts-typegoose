import { User } from "src/types/User";
import { ConverseModel, Converse } from "../../entities/mongodb/Converse";

type ConverseRequest = {
  author: number;
  participants: Array<Number>;
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

    var filteredParticipants = participants.filter(e => e != author);
    const converseFind = await ConverseModel.findOne({ where: { author: author, type: 'converse' } })
      .where('participants').in(filteredParticipants);

    if (converseFind) {
      return converseFind;
    }

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
