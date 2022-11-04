import { ResponseToolkit } from "@hapi/hapi";
const HapiCron = require("hapi-cron");

export const Cron = {
  plugin: HapiCron,
  options: {
    jobs: [
      {
        name: "testcron",
        time: "*/3 * * * * *",
        timezone: "Asia/Bangkok",
        request: {
          method: "POST",
          url: "/api/mailer/mail",
        },
        onComplete: (res: ResponseToolkit) => {
          console.log(res); // 'hello world'
        },
      },
    ],
  },
};
