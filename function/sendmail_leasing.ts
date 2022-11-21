import { logo_footer } from "./../attach/file";
import { exercise, attachmentV1, logo } from "../attach/file";
import nodemailer from "nodemailer";
import formEmailKPI from "../Controller/formEmailKPI";
import leasingEmail from "../Controller/LeasingEmail";

async function sendmail_leasing(
  body: any,
  emails: Array<string>
): Promise<any> {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gundash1@gmail.com",
        pass: "jyztxzmaptdfpsie",
      },
    });

    const { from } = body;
    // const result = await formEmailKPI(body.department);
    const result = await leasingEmail(body);
    // console.log(body);
    const optons = {
      from: from,
      to: emails,
      subject: result[0],
      // text: result[1],
      html: result[1],
      attachments: [
        {
          filename: logo,
          path: logo_footer,
          cid: "logo",
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
}

export { sendmail_leasing };
