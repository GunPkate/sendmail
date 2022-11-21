import { CustomerEntity } from "./../DB/Entities/customer_entity";

import { ResponseToolkit, ServerRoute, Request } from "@hapi/hapi";
import { DataSource } from "typeorm";
import Boom from "@hapi/boom";
import { DebtEntity } from "../DB/Entities/debt";
import leasingEmail from "./LeasingEmail";
import { sendmail_leasing } from "../function/sendmail_leasing";

const api_path = "lease";

export const leaseMailController = (con: DataSource): Array<ServerRoute> => {
  const customer = con.getRepository(CustomerEntity);
  const debt = con.getRepository(DebtEntity);

  return [
    {
      method: "GET",
      path: `/${api_path}`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        return debt.find();
      },
    },
    {
      method: "GET",
      path: `/${api_path}/debts`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        const query = `
        Select 
        FirstName,	
        LastName,
        email,	
        balance,	
        dueAt,
        c.customerId,	
        debtTypeID,
        DebtType
        from customers c 
        Join customerdetails d on d.customerDetailId = c.customerDetailId
        JOIN debts db on db.customerId = c.customerId
        join debttypes dt on dt.DebtId = db.debtTypeID
        `;
        const detail = await con.query(query);
        console.log(detail);

        return detail;
      },
    },
    {
      method: "POST",
      path: `/${api_path}/debts`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        const query = `
        Select 
        FirstName,	
        LastName,
        email,	
        balance,	
        dueAt,
        c.customerId,	
        debtTypeID,
        DebtType
        from customers c 
        Join customerdetails d on d.customerDetailId = c.customerDetailId
        JOIN debts db on db.customerId = c.customerId
        join debttypes dt on dt.DebtId = db.debtTypeID
        `;

        const debtList = await con.query(query);
        if (debtList) {
          for (let i = 0; i < debtList.length; i++) {
            sendmail_leasing(debtList[i],debtList[i].email);
          }
        }
        return h.response({
          Data: debtList,
          Count: debtList.length
        });
      },
    },
  ];
};
