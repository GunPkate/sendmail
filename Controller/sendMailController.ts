import { sendmail } from "./SDA_KPI_controller";
import path from "path";
import { Server, RouteOptions } from "@hapi/hapi";
import moment from "moment";
import { sendEmail } from "../function/sendmail";
const cron = require("cron");
const cronjob = cron.CronJob;

const pluginName: string = "sendMailController";
const pluginVersion: string = "1.0.0";
const preLoadPluginName: Array<string> = [""];

export const plugin = {
  name: pluginName,
  version: pluginVersion,
  once: true,
  //   dependencies: preLoadPluginName,
  register: async (server: Server | any, options: RouteOptions) => {
    server.app.sendMailController = class sendMailController {
      static async cronsendmail(): Promise<any> {
        let num: Number = 0;
        const checkMonth: Number = parseInt(moment().format("MM"));

        checkMonth === 3 || checkMonth === 12
          ? (num = 24)
          : checkMonth === 6 || checkMonth === 9
          ? (num = 23)
          : (num = 1);

        let time_set = `*/3 * * * * *`;
        // // let time_set = `* 0 8 22,1,${num} 11,2,5,8,9 *`; // SET date
        console.log(time_set);
        console.log(checkMonth, typeof checkMonth, num);

        var job = new cronjob(
          time_set,
          async function () {
            const dept = {
              subject: "Education",
              department: ["CU Engineer", "ABCD"],
            };

            const emails: Array<string> = ["gundash1@hotmail.com"];
            // const dept = await getConnection().manager.query(
            //   "select name,id from departments "
            // );
            // for (let i = 0; i < dept.length; i++) {
            //   const department = { department: dept[i]["name"] };
            //   const email = await getConnection().manager.query(
            //     `select email from users where department = '${dept[i]["id"]}'`
            //   );
            //   if (email.length == 1) {
            //     await server.app.SendMailController.sendEmail(
            //       department,
            //       email[0]["email"]
            //     );
            //   }
            //   if (email.length > 1) {
            //     for (let y = 0; y < email.length; y++) {
            //       await server.app.SendMailController.sendEmail(
            //         department,
            //         email[y]["email"]
            //       );
            //     }
            //   }
            // }
            sendEmail(dept, emails);
          },
          null,
          true,
          "Asia/Bangkok"
        );
        job.start();
      }
    };

    server.app.sendMailController.cronsendmail();
  },
};
