import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import mongoose from "mongoose";
import { ConverseModel, Converse } from "./Converse";

@modelOptions({ schemaOptions: { timestamps: true } })
export class Message {
  @prop()
  public MessageSendId: string;

  @prop()
  public message: string;

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

export const MessageModel = getModelForClass(Message);
