import {
  prop,
  getModelForClass,
  modelOptions,
  Ref,
} from "@typegoose/typegoose";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import * as moongose from "mongoose";
import { Message, MessageModel } from "./Message";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class Converse {
  @prop({ default: null })
  public name?: string;

  @prop()
  public author: string;

  @prop()
  public participants: string[];

  @prop({ default: null })
  public image?: string;

  @prop({
    ref: () => Message,
    localField: "_id",
    foreignField: "conversationId",
    type: () => Message,
  })
  public messages: Array<Message>;

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;
}

export const ConverseModel = getModelForClass(Converse);
