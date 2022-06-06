import { MySqlDbDataSource } from "../../db/MySqlDb";
import { User } from "../../entities/mysql/User";
import * as dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config();

type UserRequest = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export class UserService {
  async get(): Promise<Array<User> | Error> {
    const userRepository = MySqlDbDataSource.getRepository(User);
    const users = await userRepository.find();

    return users;
  }
  async create({
    name,
    email,
    phone,
    password,
  }: UserRequest): Promise<User | Error> {
    const userRepository = MySqlDbDataSource.getRepository(User);

    if (
      await userRepository.findOneBy({
        email: email,
      })
    ) {
      return new Error("Já existe um usuário com esse email");
    }

    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var encryptPassword = CryptoJS.PBKDF2(password, salt, {
      keySize: 256 / 32,
      iterations: 500,
    });
    var hashPassword = encryptPassword.toString(CryptoJS.enc.Base64);

    const UserCreate = userRepository.create({
      name: name,
      email: email,
      phone: phone,
      password: hashPassword,
    });

    await userRepository.save(UserCreate);

    return UserCreate;
  }
}
