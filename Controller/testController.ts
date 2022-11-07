import { sendmail } from './SDA_KPI_controller';
import path from "path";
import { Server, RouteOptions } from "@hapi/hapi";
import moment from "moment";
import { sendEmail } from "../function/sendmail";
const cron = require("cron");
const cronjob = cron.CronJob;

const pluginName: string = "testController";
const pluginVersion: string = "1.0.0";
const preLoadPluginName: Array<string> = [""];

export const plugin = {
  name: pluginName,
  version: pluginVersion,
  once: true,
//   dependencies: preLoadPluginName,
  register: async (server: Server | any, options: RouteOptions) => {
    server.app.testController = class testController  {
      static async cronsendmail(): Promise<any> {
        let num: Number = 0;
        const checkMonth: Number = parseInt(moment().format("MM"));

        checkMonth === 3 || checkMonth === 12
          ? (num = 24)
          : checkMonth === 6 || checkMonth === 9
          ? (num = 23)
          : (num = 1);

        let time_set = `*/3 * * * * *`;
        console.log(time_set);
        console.log(checkMonth, typeof checkMonth, num);

        var job = new cronjob(
          time_set,
          async function () {
            const data = {
              subject: "Education",
              department: "CU Engineer",
            };

            const emails: Array<string> = ["gundash1@hotmail.com"];

            sendEmail(data, emails);
          },
          null,
          true,
          "Asia/Bangkok"
        );
        job.start();
      }
    };

    server.app.testController.cronsendmail()
  },
};
