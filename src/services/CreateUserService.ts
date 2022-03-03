import { getRepository } from "typeorm";
import { User } from "../entities/User";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";

dotenv.config();

type UserRequest = {
    username: string;
    email: string;
    password: string;
};

export class CreateUserService {
    async execute({
        username,
        email,
        password
    }: UserRequest): Promise<User | Error> {
        const userRepository = getRepository(User);

        if (await userRepository.findOne({ username })) {
            return new Error('Já existe um usuário com esse username');
        }

        var salt = CryptoJS.lib.WordArray.random(128/8);
        var encryptPassword = CryptoJS.PBKDF2(password, salt, {
            keySize: 256/32,
            iterations: 500
        });
        var hashPassword = encryptPassword.toString(CryptoJS.enc.Base64);

        const user = userRepository.create({
            username,
            email,
            password: hashPassword
        });

        await userRepository.save(user);

        return user;
    }

}