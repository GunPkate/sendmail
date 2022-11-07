import { ResponseToolkit } from "@hapi/hapi";
import moment from "moment";
const HapiCron = require("hapi-cron");

let num: Number = 0;
const checkMonth: Number = parseInt(moment().format("MM"));
// const checkMonth: Number = 3;
checkMonth === 3 || checkMonth === 12
  ? (num = 24)
  : checkMonth === 6 || checkMonth === 9
  ? (num = 23)
  : (num = 1);
let time_set = `* * * 4,1,${num} 10,11,2,5,8,9 *`; // SET date sec min hour date month{0-11}

export const Cron = {
  plugin: HapiCron,
  options: {
    jobs: [
      {
        name: "testcron",
        // time: "*/3 * * * * *",
        time: time_set,
        timezone: "Asia/Bangkok",
        request: {
          method: "POST",
          url: "/api/mailer/mail",
        },
        onComplete: (res: ResponseToolkit) => {
          console.log(res);
        },
      },
    ],
  },
};
