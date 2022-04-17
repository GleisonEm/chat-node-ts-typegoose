import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    ObjectIdColumn
} from 'typeorm';
import { User } from 'src/types/User';
import { v4 as uuid} from "uuid";

@Entity('converses')
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

    @CreateDateColumn({
        type: 'timestamp',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    updatedAt: Date;

    constructor() {
        if (!this._id) {
            this._id = uuid();
        }
    }
}