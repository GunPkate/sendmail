import { plugin } from "./Controller/sendMailController";
import { ResponseToolkit, Server, Request } from "@hapi/hapi";
import { mailer } from "./Routes/mailer";
import { Cron } from "./Routes/CronMail";
import moment from "moment";
import { sendEmail } from "./function/sendmail";
import { sendmail } from "./Controller/SDA_KPI_controller";
import serverOptions from "./server";
import { local_dataSource } from "./DB/Mysql/local";
import { thanaLeasing } from "./Routes/thanaLeasing";
const cron = require("cron");
const cronjob = cron.CronJob;
const HapiCron = require("hapi-cron");

const init = async () => {
  // await server.register(Cron);
  const server: Server = new Server(serverOptions);
  // await server.app.testController.sendmail()
  await server.register(mailer);
  await server.register(thanaLeasing);
  // await server.register(plugin);
  // await server.route(sendmail());

  local_dataSource();
  await server.start();
  console.log(server.info.uri);
};

init().then();
