import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import mongoose from "mongoose";
import { ConverseModel, Converse } from "./Converse";
import { User } from "./User";

@modelOptions({ schemaOptions: { timestamps: true } })
export class ConverseStatus {
  // @prop({
  //     ref: () => ConverseModel,
  //     foreignField: 'messages',
  //     localField: 'converse',
  // })
  // public converse: Ref<Converse>;

  @prop({
    ref: () => Converse,
    required: true,
  })
  public conversationId: Ref<Converse>;

  @prop({
    ref: () => Converse,
    required: true,
  })
  public userId: Ref<User>;

  @prop({ default: "sent" })
  public status: string;

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;

  public get updatedAtToTimestamp() {
    return Date.parse(this.updatedAt.toISOString());
  }
}

export const ConverseStatusModel = getModelForClass(ConverseStatus);
