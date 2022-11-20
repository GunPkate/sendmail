import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Debts" })
export class DebtEntity {
  // constructor(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   birthDate: Date,
  //   type: DebtType,
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
  DebtId!: number;
  @Column({ nullable: false, name: "FirstName" })
  firstName!: string;
  @Column({ nullable: false, name: "LastName" })
  lastName!: string;
  @Column({ nullable: false, unique: true })
  departmentID!: number;
  @Column({ nullable: false })
  customerId!: number;
}
