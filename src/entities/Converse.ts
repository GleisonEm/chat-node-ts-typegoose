import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  ObjectIdColumn,
  OneToMany,
  JoinTable,
} from "typeorm";
import { User } from "src/types/User";
import { Message } from "./Message";

@Entity("converses")
export class Converse {
  @ObjectIdColumn()
  _id: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  author: string;

  @Column()
  participants: Array<User>;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Message, (message) => message.converse)
  messages: Message[]

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    nullable: true,
  })
  updatedAt: Date;
}
