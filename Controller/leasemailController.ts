import { CustomerEntity } from "./../DB/Entities/customer_entity";

import { ResponseToolkit, ServerRoute, Request } from "@hapi/hapi";
import { DataSource } from "typeorm";
import Boom from "@hapi/boom";
import { DebtEntity } from "../DB/Entities/debt";

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
      path: `/${api_path}/debt`,
      handler: async (request: Request, h: ResponseToolkit, err?: Error) => {

        return con;
      },
    },
    // {
    //   method: "GET",
    //   path: `/${api_path}/{id}`,
    //   handler: (request: Request, h: ResponseToolkit, err?: Error) => {
    //     const id: number = request.params.id;
    //     return customer.findOneBy({ id: id });
    //   },
    // },
    // {
    //   method: "Delete",
    //   path: `/${api_path}/{id}`,
    //   handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
    //     try {
    //       const id: number = request.params.id;
    //       const find: any = await customer.findOneBy({ id: id });
    //       await customer.remove(find);
    //       return "Deleted";
    //     } catch (error) {
    //       const err: Error = new Error("Delete Error");
    //       Boom.boomify(err, { statusCode: 500 });
    //     }
    //   },
    // },
  ];
};
