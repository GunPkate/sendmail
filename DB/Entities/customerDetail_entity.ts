import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "CustomerDetails" })
export class CustomerDetailDetailEntity {
  // constructor(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   birthDate: Date,
  //   type: CustomerDetailDetailType,
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
  CustomerDetailId!: number;
  @Column({ nullable: false, name: "FirstName" })
  firstName!: string;
  @Column({ nullable: false, name: "LastName" })
  lastName!: string;
  @Column({ nullable: false, unique: true })
  email!: string;
  @Column({ nullable: false })
  contact!: string;
  @Column({ nullable: false })
  address!: string;
}
