import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  phone: string;

  @Column({ default: null })
  registration_code: string;

  @Column()
  password: string;

  @Column({ default: null })
  token: string;

  @Column({ default: null })
  type: string;
}

