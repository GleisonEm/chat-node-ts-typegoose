import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    PrimaryColumn,
    ObjectIdColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { v4 as uuid} from "uuid";

@Entity('messages')
export class Message {
    @ObjectIdColumn()
    _id: string;

    @Column()
    userSendId: string;

    @Column()
    message: string;

    @Column()
    conversationId: string;

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    updatedAt: Date;
}