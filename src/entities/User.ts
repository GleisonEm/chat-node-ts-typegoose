import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    ObjectIdColumn
} from 'typeorm';

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    token: string;

    @Column()
    password: string;

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