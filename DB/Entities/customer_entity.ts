import { DebtEntity } from "./debt";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CustomerDetailDetailEntity } from "./customerDetail_entity";
import { EmployeeEntity } from "./employee_entity";

@Entity({ name: "Customers" })
export class CustomerEntity {
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
  @ManyToOne(
    () => EmployeeEntity,
    (employee: EmployeeEntity) => employee.customerId
  )
  // @OneToMany(() => DebtEntity, (debt: DebtEntity) => debt.customerID, {
  //   cascade: true,
  // })
  @PrimaryGeneratedColumn()
  customerId!: number;

  @OneToOne(() => CustomerDetailDetailEntity)
  @JoinColumn()
  customerDetailId!: CustomerDetailDetailEntity;
}
