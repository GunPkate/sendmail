import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "DebtStatus" })
export class DebtStatusEntity {
  // constructor(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   birthDate: Date,
  //   type: CustomerType,
  //   password: string,

  // ) {
  //   super();
  //   this.firstName = firstName;
  //   this.lastName = lastName;

  //   this.email = email;
  //   this.address = address;
  //   this.contact = contact;

  // }

  @PrimaryGeneratedColumn()
  debtStatusId!: number;
  @Column({ nullable: false })
  debtStatus!: string;
}
