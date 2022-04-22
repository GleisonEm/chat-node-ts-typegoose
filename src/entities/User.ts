import { prop, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class User extends TimeStamps {

    @prop()
    public email: string;

    @prop()
    public username: string;

    @prop()
    public token: string;

    @prop()
    public password: string;

    @prop()
    public createdAt: Date;

    @prop()
    public updatedAt: Date;
}

export const UserModel = getModelForClass(User);