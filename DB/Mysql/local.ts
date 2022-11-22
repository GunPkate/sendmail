import { DebtStatusEntity } from "./../Entities/debtStatus";
import { DepartmentEntity } from "./../Entities/department_entity";
import { EmployeeEntity } from "./../Entities/employee_entity";
import { DebtTypeEntity } from "./../Entities/debtType";
import { CustomerEntity } from "./../Entities/customer_entity";
import { createConnection, DataSource } from "typeorm";

import "reflect-metadata";
import { CustomerDetailDetailEntity } from "../Entities/customerDetail_entity";
import { DebtEntity } from "../Entities/debt";

const tables: any[] = [
  CustomerEntity,
  CustomerDetailDetailEntity,
  DebtEntity,
  DebtTypeEntity,
  EmployeeEntity,
  DepartmentEntity,
  DebtStatusEntity,
];

export const local_dataSource = async (): Promise<DataSource> => {
  // const mockfunc = [mockUsers, mockPosts];
  // console.log(mockfunc);
  const con: DataSource = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "leasing",
    // synchronize: true,
    logging: true,
    entities: tables,
  });
  console.log("connected");
  // for (const fun of mockfunc) {
  //   await fun(con);
  // }

  return con;
  // local_dataSource.initialize();
};
