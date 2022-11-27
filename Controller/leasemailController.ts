import moment from "moment";
import { CustomerEntity } from "./../DB/Entities/customer_entity";

import { ResponseToolkit, ServerRoute, Request } from "@hapi/hapi";
import { DataSource } from "typeorm";
import Boom from "@hapi/boom";
import { DebtEntity } from "../DB/Entities/debt";
import leasingEmail from "./LeasingEmail";
import { sendmail_leasing } from "../function/sendmail_leasing";

const api_path = "lease";

const allCustomer = `
Select 
c.customerId,	
FirstName,	
LastName,
ds.debtstatusId,
ds.debtstatus

from customers c 
Join customerdetails d on d.customerDetailId = c.customerDetailId
JOIN debts db on db.customerId = c.customerId
join debtstatus ds on ds.debtstatusId = db.debtstatusId
`;

const debtlist_query =`
Select 
c.customerId,	
FirstName,	
LastName,
email,	
balance,	
dueAt,
dt.debtTypeID,
dt.debtType,
ds.debtstatusId,
ds.debtstatus

from customers c 
Join customerdetails d on d.customerDetailId = c.customerDetailId
JOIN debts db on db.customerId = c.customerId
join debttypes dt on dt.DebtTypeId = db.debtTypeID
join debtstatus ds on ds.debtstatusId = db.debtstatusId
 where ds.debtstatusId = '2'
`;

const calDate = async (item: any) => {
  const now = await moment();
  let date = await moment(item.dueAt, "YYYY-MM-DD");
  let lateDue = await now.diff(date, "days");
  console.log(now.format("YYYY-MM-DD"), date.format("YYYY-MM-DD"), lateDue);
  return lateDue;
};

export const leaseMailController = (con: DataSource): Array<ServerRoute> => {
  const customer = con.getRepository(CustomerEntity);
  const debt = con.getRepository(DebtEntity);

  return [
    {
      method: "GET",
      path: `/${api_path}/find`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        return debt.find();
      },
    },
    {
      method: "GET",
      path: `/${api_path}/allCustomer`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        const detail = await con.query(allCustomer);
        console.log(detail);

        return h.response({
          Data: detail,
          Count: detail.length,
        });
      },
    },
    {
      method: "GET",
      path: `/${api_path}/alldebts`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        const detail = await con.query(debtlist_query);
        console.log(detail);

        return h.response({
          Data: detail,
          Count: detail.length,
        });
      },
    },
    {
      method: "GET",
      path: `/${api_path}/currentdebts`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        const debtList = await con.query(debtlist_query);
        let array = [];
        if (debtList) {
          array = debtList.filter(
            async (item: { dueAt: any; debtstatusId: number }) => {
              return await calDate(item) > 0;
            }
          );
          for (let i = 0; i < array.length; i++) {
            // console.log(array[i]);
            // sendmail_leasing(array[i], array[i].email);
            // sendmail_leasing(debtList[i],debtList[i].email);
          }
        }
        return h.response({
          Data: array,
          Count: array.length,
        });
      },
    },
    {
      method: "POST",
      path: `/${api_path}/currentdebts`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        let array = [];
        const debtList = await con.query(debtlist_query);
        if (debtList) {
          array = debtList.filter(async (item: { dueAt: any }) => {
            return await calDate(item) > 0;
          });
          for (let i = 0; i < array.length; i++) {
            console.log(array[i]);
            sendmail_leasing(array[i], array[i].email);
            // sendmail_leasing(debtList[i],debtList[i].email);
          }
        }
        return h.response({
          Data: array,
          Count: array.length,
        });
      },
    },
  ];
};
