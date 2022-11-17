import { sendEmail } from "../function/sendmail";
import Boom from "@hapi/boom";
import { ResponseToolkit, Request, Server } from "@hapi/hapi";

export const mailer = {
  name: "user",
  version: "1.0.0",
  register: async (server: Server) => {
    server.route({
      method: "POST",
      path: "/api/mailer/mail",
      handler: async (request: Request, h: ResponseToolkit) => {
        try {
          const emails: Array<string> = [
            "gundash1@hotmail.com",
            // "edvisory.test.mail@gmail.com",
            "pu.gun_st@tni.ac.th",
            // "gundash1@gmail.com",
          ];

          // const department = {
          //   subject: "Education",
          //   department: "CU Engineer",
          // };
          if (emails.length != 0) {
            const info = await sendEmail(request.payload, emails);
            // const info = await sendEmail(department.department, emails);

            return h.response({
              // department_name: department.department,
              department_name: request.payload,
              email_count: emails.length,
              email: emails,
              // info: info,
            });
          } else if (emails.length == 0) {
            // } else if (emails.length == 0 || department.department) {
            const err = new Error("Email or Department not found");
            Boom.boomify(err, { statusCode: 404 });
            // res.status(404).json({ detail: "Email not found" });
          }
        } catch (error) {
          const err = new Error("Error");
          Boom.boomify(err, { statusCode: 500 });
        }
      },
    });
  },
};
