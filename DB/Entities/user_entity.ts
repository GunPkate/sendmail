import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./posts_entity";
import { SharedProp } from "./sharedProp";

export type UserType = "admin" | "user";

// enum UserType2 {
//   user = "user",
//   admin = "admin",
// }

@Entity({ name: "users" })
export class UserEntity extends SharedProp {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    birthDate: Date,
    type: UserType,
    password: string,
    salt: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
    this.type = type;
    this.password = password;
    this.salt = salt;
  }

  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ nullable: false, name: "first_name" })
  firstName!: string;
  @Column({ nullable: false, name: "last_name" })
  lastName!: string;
  @Column({ nullable: false, unique: true })
  email!: string;
  @Column({ nullable: true, name: "birth_date" })
  birthDate!: Date;
  @Column({ default: "user" })
  type!: UserType;
  @Column({ nullable: false })
  password!: string;
  @Column({ nullable: false })
  salt!: string;
  //   @Column({ default: UserType2.user, enum: UserType2, type: "enum" })
  //   type2!: UserType2;

  @OneToMany(() => PostEntity, (post: PostEntity) => post.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  posts!: Array<PostEntity>;
}
