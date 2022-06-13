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
  // @prop()
  // public MessageSendId: string;
  @prop()
  public userSendId: Number;

  @prop()
  public message: string;

  @prop()
  public uniqueId: string;
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

  // public set addSendAgo(value: any) {
  //   this.sendAgo = value;
  // }

  // public sendAgo: Number;
  // public get sendAgo() {

  //   var minutes = (Date.now() - Date.parse(this.createdAt.toISOString())) / 60000;

  //   return minutes;
  // }
}

export const MessageModel = getModelForClass(Message);
