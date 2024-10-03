import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}