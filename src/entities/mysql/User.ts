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
  cpf: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @Column({ default: null })
  path_signature: string;

  @Column({ default: 4 })
  assignment_id: number;

  @Column({ default: 4 })
  institute_id: number;

  @Column({ default: 4 })
  area_id: number;

  @Column({ default: 'N' })
  block: string;

  @Column({ default: null })
  remember_token: string;

  @Column({ default: null })
  tags: string;
}

