import { CustomerEntity } from './customer_entity';
import { DebtTypeEntity } from "./debtType";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  
  @ManyToOne(
    () => CustomerEntity,
    (customer: CustomerEntity) => customer.customerId
  )
  customerID!: number;

  @Column({ nullable: false })
  Balance!: string;

  @OneToOne(() => DebtTypeEntity)
  @JoinColumn()
  DebtTypeID!: DebtTypeEntity;

  @Column({ nullable: false })
  Date!: Date;
}
