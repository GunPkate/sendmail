import moment from "moment";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

interface debtList {
  FirstName: string;
  LastName: string;
  email: string;
  balance: string;
  dueAt: Date;
  customerId: number;
  debtTypeID: number;
  DebtType: string;
}

async function leasingEmail(debtList: debtList): Promise<Array<string>> {
  const mail = await setData(debtList);
  const data = mail.content;
  const setmail = mail.email;

  const template = Handlebars.compile(setmail);

  let result = template(data);
  console.log(result, moment().format("DD-MM-YYYY hh:mm:ss"));
  return [data.subject, result];
}

async function setData(debtList: debtList) {
  const deptname = "ธนาคาร ธ.ธนา";
  const subject = "ขอแจ้งยอดเงินค้างชำระ";
  const leasee = debtList.FirstName + " " + debtList.LastName;
  const date = moment(debtList.dueAt).format("DD-MM-YYYY");
  const debt = debtList.balance;
  const enp_name = "B";

  const now = moment();
  let date2 = moment(debtList.dueAt).format("YYYY-MM-DD");
  let dateCal = moment(date2.split("-"));
  console.log(leasee, now.diff(dateCal, "days"));
  let lateDue = now.diff(dateCal, "days");
  // console.log(leasee, moment().diff(moment(date), "days"));

  let filepath = "";
  let deadline = "";
  if (lateDue <= 30 && lateDue > 0) {
    filepath = "normalAR.hbs";
  } else if (lateDue > 30 && lateDue <= 60) {
    filepath = "secondAR.hbs";
    deadline = now.add(15).format("DD-MM-YYYY");
  } else if (lateDue > 60 && lateDue <= 90) {
    filepath = "thirdAR.hbs";
    deadline = now.add(15).format("DD-MM-YYYY");
  } else if (lateDue > 90) {
    filepath = "badDebt.hbs";
    deadline = now.add(15).format("DD-MM-YYYY");
  } else {
    filepath = "normalAR.hbs";
  }

  let data = {
    deptname: deptname,
    subject: subject,
    leasee: leasee,
    date: date,
    debt: debt,
    enp_name: enp_name,
  };

  // let template = Handlebars.compile(source); //Conent of Email
  const emailTemplate = fs.readFileSync(
    path.join(__dirname, `/LeasingDebt/${filepath}`),
    "utf-8"
  );
  return { email: emailTemplate, content: data };
}

export default leasingEmail;
