import moment from "moment";
import { CustomerEntity } from "./../DB/Entities/customer_entity";

import { ResponseToolkit, ServerRoute, Request } from "@hapi/hapi";
import { DataSource } from "typeorm";
import Boom from "@hapi/boom";
import { DebtEntity } from "../DB/Entities/debt";
import leasingEmail from "./LeasingEmail";
import { sendmail_leasing } from "../function/sendmail_leasing";

const api_path = "lease";
const debtlist_query = `
Select 
c.customerId,	
FirstName,	
LastName,
email,	
balance,	
dueAt,
dt.debtTypeID,
dt.debtType,
ds.debtstatus

from customers c 
Join customerdetails d on d.customerDetailId = c.customerDetailId
JOIN debts db on db.customerId = c.customerId
join debttypes dt on dt.DebtTypeId = db.debtTypeID
join debtstatus ds on ds.debtstatusId = db.debtstatusId
`;

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
          const now = moment();
          array = debtList.filter((item: { dueAt: any }) => {
            let date = moment(item.dueAt).format("YYYY-MM-DD");
            let dateCal = moment(date.split("-"));
            let lateDue = now.diff(dateCal, "days");
            return lateDue > 0;
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
    {
      method: "POST",
      path: `/${api_path}/currentdebts`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
        let array = [];
        const debtList = await con.query(debtlist_query);
        if (debtList) {
          const now = moment();
          array = debtList.filter((item: { dueAt: any }) => {
            let date = moment(item.dueAt).format("YYYY-MM-DD");
            let dateCal = moment(date.split("-"));
            let lateDue = now.diff(dateCal, "days");
            return lateDue > 0;
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
