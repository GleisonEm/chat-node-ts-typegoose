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
  type: string;
};

type UserGetRequest = {
  userIds?: Array<Number>;
  type?: number;
};
export class UserService {
  async ge2t(): Promise<Array<User> | Error> {
    const userRepository = MySqlDbDataSource.getRepository(User);
    const users = await userRepository.find();

    return users;
  }
  async get({ userIds, type }: UserGetRequest): Promise<Array<User> | Error> {
    const userRepository = MySqlDbDataSource.getRepository(User);
    var users = userRepository.createQueryBuilder();

    if (userIds) {
      users = users.where("id IN (:users)", { users: userIds });
    }
    console.log(type)
    if (type) {
      users = users.where("assignment_id = :type", { type: type });
    }

    return users.getMany();
  }
  async create({
    name,
    email,
    phone,
    password,
    type
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
      password: hashPassword,
    });

    await userRepository.save(UserCreate);

    return UserCreate;
  }
}
