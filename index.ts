import express, { Application } from "express";
import mailer from "./Routes/mailer";
const cron = require("cron");
const cronjob = cron.CronJob;
import { sendEmail } from "./function/sendmail";
import moment from "moment";

// let http = new XMLHttpRequest();
// let method = 'post';
// let url = 'http://localhost:3000/api/mailer/mail'
// http.open(method,url)

const port: Number = 3000;
const app: Application = express();
app.use(express.json());

app.use("/api/mailer", mailer);

let num: Number = 0;
// const checkMonth: Number = parseInt(moment().format("MM"));
// const checkMonth: Number = 3;
// checkMonth === 3 || checkMonth === 12
//   ? (num = 24)
//   : checkMonth === 6 || checkMonth === 9
//   ? (num = 23)
//   : (num = 1);
// let time_set = `* 0 8 22,1,${num} 11,2,5,8,9 *`; // SET date
// let time_set = `*/10 *  21,1,23 11,2,5,8,9 *`;
let time_set = `*/2 * * * * *`;
// console.log(time_set);
// console.log(checkMonth, typeof checkMonth, num);

// var job = new cronjob(
//   time_set,
//   async function () {
//     //Body
//     const data = {
//       to: "gundash1@hotmail.com",
//       subject: "Education",
//       department: "CU Engineer",
//       file: "exercise.csv",
//       attachment: "attach/exercise.csv",
//     };

//     sendEmail(data);
//     // await app.use("/api/mailer", mailer);
//   },
//   null,
//   true,
//   "Asia/Bangkok"
// );
// job.start();
//service que

app.listen(port, () => console.log(`start server port: ${port} !!`));
