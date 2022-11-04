const Hapi = require("@hapi/hapi");
const HapiCron = require("hapi-cron");
const moment = require("moment");

const server = new Hapi.Server({
  port: 4000,
  host: "localhost",
});

async function allSystemsGo() {
  try {
    await server.register({
      plugin: HapiCron,
      options: {
        jobs: [
          {
            name: "testcron",
            time: "*/3 * * * * *",
            timezone: "Europe/London",
            request: {
              method: "GET",
              url: "/test-url",
            },
            onComplete: (res) => {
              console.log(res); // 'hello world'
            },
          },
        ],
      },
    });

    server.route({
      method: "GET",
      path: "/test-url",
      handler: function (request, h) {
        return `hello world${moment()}`;
      },
    });

    await server.start();
  } catch (err) {
    console.info("there was an error");
  }
}

allSystemsGo();
