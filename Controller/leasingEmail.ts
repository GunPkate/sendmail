import moment from "moment";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

interface debtList 
  {
    "FirstName": string,
    "LastName": string,
    "email": string,
    "balance": string,
    "dueAt": Date,
    "customerId":number,
    "debtTypeID":number,
    "DebtType": string
  }

async function leasingEmail(debtList: debtList): Promise<Array<string>> {
  const setmail = await setData(debtList);
  let data = {
    deptname: setmail.deptname,
    subject: setmail.subject,
    leasee: setmail.leasee,
    date: setmail.date,
    debt: setmail.debt,
    enp_name: setmail.enp_name,
  };

  // let template = Handlebars.compile(source); //Conent of Email
  const emailTemplate = fs.readFileSync(
    path.join(__dirname, `/LeasingDebt/${setmail.filepath}`),
    "utf-8"
  );
  const template = Handlebars.compile(emailTemplate);

  let result = template(data);
  console.log(result, moment().format("DD-MM-YYYY hh:mm:ss"));
  return [data.subject, result];
}

async function setData(debtList:debtList) {
  const deptname = "ธนาคาร ธ.ธนา";
  const subject = "ขอแจ้งยอดเงินค้างชำระ";
  const leasee = debtList.FirstName+" "+debtList;
  const date = debtList.dueAt;
  const debt = debtList.balance;
  const enp_name = "B";

  let filepath = "normalAR.hbs";
  return { deptname, subject, leasee, date, debt, enp_name, filepath };
}

export default leasingEmail;
