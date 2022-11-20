import { UserEntity } from "./user_entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SharedProp } from "./sharedProp";

@Entity({ name: "posts" })
export class PostEntity extends SharedProp {
  constructor(title: string, body: string, user: UserEntity) {
    super();
    this.title = title;
    this.body = body;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column({ type: "text" })
  body!: string;
  @Column({ name: "user_id", nullable: false })
  userId!: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
