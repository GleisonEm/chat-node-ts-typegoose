import { UserModel, User } from "../../entities/mongodb/User";
import CryptoJS from "crypto-js";

type UserRequest = {
  username: string;
  email: string;
  password: string;
};

export class CreateUserService {
  async execute({
    username,
    email,
    password,
  }: UserRequest): Promise<User | Error> {
    if (await UserModel.findOne({ where: { username: username } })) {
      return new Error("Já existe um usuário com esse username");
    }

    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var encryptPassword = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 500,
    });
    var hashPassword = encryptPassword.toString(CryptoJS.enc.Base64);

    const UserCreate = new UserModel({
      username,
      email,
      password: hashPassword,
    });

    await UserCreate.save();

    return UserCreate;
  }
}
