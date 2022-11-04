import { ResponseToolkit } from "@hapi/hapi";
import { mailer } from "./Routes/mailer";
import { Cron } from "./Routes/CronMail";
import moment from "moment";
import { sendEmail } from "./function/sendmail";
import server from "./server";
import { sendmail } from "./Controller/SDA_KPI_controller";
const cron = require("cron");
const cronjob = cron.CronJob;
const HapiCron = require("hapi-cron");

const init = async () => {
  // let num: Number = 0;
  // const checkMonth: Number = parseInt(moment().format("MM"));
  // const checkMonth: Number = 3;
  // checkMonth === 3 || checkMonth === 12
  //   ? (num = 24)
  //   : checkMonth === 6 || checkMonth === 9
  //   ? (num = 23)
  //   : (num = 1);
  // let time_set = `* 0 8 22,1,${num} 11,2,5,8,9 *`; // SET date
  // let time_set = `*/10 *  21,1,23 11,2,5,8,9 *`;
  // let time_set = `*/1 * * * * *`;
  // console.log(time_set);
  // console.log(checkMonth, typeof checkMonth, num);

  // var job = new cronjob(
  //   time_set,
  //   async function () {
  //     //Body
  //     const data = {
  //       subject: "Education",
  //       department: "CU Engineer",
  //       //   file: "exercise.csv",
  //       //   attachment: "attach/exercise.csv",
  //     };
  //     // Send to Emails
  //     const emails: Array<string> = [
  //       "gundash1@hotmail.com",
  //       // "edvisory.test.mail@gmail.com",
  //       // "pu.gun_st@tni.ac.th",
  //       // "gundash1@gmail.com",
  //     ];

  //     sendEmail(data, emails);

  //   },
  //   null,
  //   true,
  //   "Asia/Bangkok"
  // );
  // job.start();

  // console.log((+moment().format("YYYY"))+543);

  // await server.register({
  //   plugin: HapiCron,
  //   options: {
  //     jobs: [
  //       {
  //         name: "testcron",
  //         time: "*/3 * * * * *",
  //         timezone: "Europe/London",
  //         request: {
  //           method: "POST",
  //           url: "/api/mailer/mail",
  //         },
  //         onComplete: (res: ResponseToolkit) => {
  //           console.log(res); // 'hello world'
  //         },
  //       },
  //     ],
  //   },
  // });

  await server.register(Cron);
  await server.register(mailer);
  // await server.route(sendmail());

  await server.start();
  console.log(server.info.uri);
};
//email ภายใน?
init().then();
