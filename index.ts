import { plugin } from "./Controller/sendMailController";
import { ResponseToolkit, Server, Request } from "@hapi/hapi";
import { mailer } from "./Routes/mailer";
import { Cron } from "./Routes/CronMail";
import moment from "moment";
import { sendEmail } from "./function/sendmail";
import { sendmail } from "./Controller/SDA_KPI_controller";
import serverOptions from "./server";
const cron = require("cron");
const cronjob = cron.CronJob;
const HapiCron = require("hapi-cron");

const init = async () => {
  // await server.register(Cron);
  const server: Server = new Server(serverOptions);
  // await server.app.testController.sendmail()
  await server.register(mailer);
  await server.register(plugin);
  // await server.route(sendmail());

  await server.start();
  console.log(server.info.uri);
};
//email ภายใน?
init().then();
