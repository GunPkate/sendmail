import { CustomerEntity } from "./customer_entity";
import { DepartmentEntity } from "./department_entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "Employees" })
export class EmployeeEntity {
  // constructor(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   birthDate: Date,
  //   type: EmployeeType,
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
  employeeId!: number;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

  @ManyToOne(
    () => DepartmentEntity,
    (department: DepartmentEntity) => department.departmentId
  )
  @JoinColumn({ name: "departmentId" })
  departmentId!: DepartmentEntity;

  @OneToMany(
    () => CustomerEntity,
    (customer: CustomerEntity) => customer.customerId
  )
  customerId!: Array<CustomerEntity>;
}
