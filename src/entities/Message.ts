import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    PrimaryColumn,
    ObjectIdColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    RelationId
} from 'typeorm';
import { Converse } from './Converse';

@Entity('messages')
export class Message {
    @ObjectIdColumn()
    _id: string;

    @Column()
    userSendId: string;

    @Column()
    message: string;

    @RelationId((message: Message) => message.converse)
    conversationId: string;

    @Column({
        default: 'sent'
    })
    status: string;

    @ManyToOne(() => Converse, (converse) => converse.messages)
    converse: Converse

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