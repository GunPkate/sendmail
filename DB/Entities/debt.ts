import { CustomerEntity } from "./customer_entity";
import { DebtTypeEntity } from "./debtType";
import {
  Column,
  CreateDateColumn,
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
  debtId!: number;

  @ManyToOne(
    () => CustomerEntity,
    (customer: CustomerEntity) => customer.customerId
  )
  @JoinColumn({ name: "customerId" })
  customerId!: number;

  @Column({ nullable: false })
  balance!: string;

  @ManyToOne(() => DebtTypeEntity,(debtType:DebtTypeEntity)=>debtType.DebtId)
  @JoinColumn({ name: "debtTypeID" })
  debtTypeID!: DebtTypeEntity;

  @CreateDateColumn({
    default: () => "CURRENT_TIMESTAMP",
    type: "datetime",
  })
  createdAt!: Date;
}
