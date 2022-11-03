import { exercise, attachmentV1 } from "./../attach/file";
import nodemailer from "nodemailer";
import formEmailKPI from "../Controller/formEmailKPI";

async function sendEmail(body: any, emails: Array<string>): Promise<any> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gundash1@gmail.com",
        pass: "jyztxzmaptdfpsie",
      },
      // auth: {
      //     "user": "edvisory.test.mail@gmail.com",
      //     "pass": "A#8d@3mn"
      // }
    });

    const { from, to, subject, text, file, attachment } = body;
    const result = formEmailKPI(body.department);
    console.log(body);
    const optons = {
      from: from,
      to: emails,
      subject: result[0],
      text: result[1],
      attachments: [
        {
          filename: exercise,
          path: attachmentV1,
        },
      ],
    };

    const info = await transporter.sendMail(optons);
    // console.log(info);
    // return info;
    return info;
  } catch (error) {
    console.log(error);
  }

  //   transporter.sendMail(optons, (err, info) => {
  // if (err) {
  //   console.log(err);
  //   return;
  // }
  // console.log("send: " + info.response);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // return info;
  //   });
}

export { sendEmail };
