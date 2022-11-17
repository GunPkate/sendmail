import moment from "moment";
import Handlebars from "handlebars";
import { source } from "./PDFtemplate/source";
import fs from "fs";
import path from "path";

async function formEmailKPI(department: string): Promise<Array<string>> {
  let time = await setTime(moment("2023-08-28")); //input time here
  let set_quarter: Number = time["quarter"];
  let set_timeline: string = time["timeline"];
  let year: Number = set_quarter == 1 ? time["year"] + 1 : time["year"]; //if Q1 year+1 else year

  // switch (checkMonth) {
  //   case 3:
  //     set_quarter = quarter["q2"];
  //     set_timeline = timeline["q2"];
  //     break;
  //   case 6:
  //     set_quarter = quarter["q3"];
  //     set_timeline = timeline["q3"];
  //     break;
  //   case 9:
  //     set_quarter = quarter["q4"];
  //     set_timeline = timeline["q4"];
  //     break;
  //   case 12:
  //     set_quarter = quarter["q1"];
  //     set_timeline = timeline["q1"];
  //     break;
  //   default:
  //     set_quarter = quarter["q4"];
  //     set_timeline = timeline["q4"];
  // }

  //Email parameter & header
  let data = {
    name: department,
    // name: "วิทยาการคอมพิวเตอร์",
    emp_name: "สมชาย เอ",
    tel: "0821114544",
    emails: [{ mail: "g1@gmail.com " }, { mail: "a1@gmail" + ".com " }],
    subject: `แจ้งกำหนดการรายงานผลตัวชี้วัด SDA และ KPI ประจำปีงบประมาณ ${year} สำหรับหน่วยงานหรือภาควิชา`,
    quarter: set_quarter,
    time: set_timeline,
    budgetYear: year,
  };

  // let template = Handlebars.compile(source); //Conent of Email
  const emailTemplate = fs.readFileSync(
    path.join(__dirname, "/PDFtemplate/KPISDA.hbs"),
    "utf-8"
  );
  const template = Handlebars.compile(emailTemplate);

  let result = template(data);
  console.log(result, moment().format("DD-MM-YYYY hh:mm:ss"));
  return [data.subject, result];
}

async function setTime(thisTime: moment.Moment) {
  const quarter = { q1: 1, q2: 2, q3: 3, q4: 4 };
  const year = +thisTime.format("YYYY") + 543;
  let timeline = {
    q1: `วันที่ 1 ธันวาคม พ.ศ. ${year} ถึงวันที่ 31 ธันวาคม พ.ศ. ${year}`,
    q2: `วันที่ 1 มีนาคม  พ.ศ. ${year} ถึงวันที่ 31 มีนาคม  พ.ศ. ${year}`,
    q3: `วันที่ 1 มิถุนายน พ.ศ. ${year} ถึงวันที่ 30 มิถุนายน พ.ศ. ${year}`,
    q4: `วันที่ 1 กันยายน พ.ศ. ${year} ถึงวันที่ 30 กันยายน พ.ศ. ${year}`,
  };

  // const checkMonth: Number = parseInt(moment().format("MM"));
  const checkMonth: Number = parseInt(moment().format("MM"));
  let set_quarter: Number = 0;
  let set_timeline: string = "";
  const dec = `${thisTime.format("YYYY")}-12-31`;
  const oct = `${thisTime.format("YYYY")}-10-01`;
  const sep = `${thisTime.format("YYYY")}-09-30`;
  const jul = `${thisTime.format("YYYY")}-07-01`;
  const jun = `${thisTime.format("YYYY")}-06-30`;
  const apr = `${thisTime.format("YYYY")}-04-01`;
  const mar = `${thisTime.format("YYYY")}-03-31`;
  const jan = `${thisTime.format("YYYY")}-01-31`;

  // Q1 Oct 1 -Dec 31 Optimize
  if (thisTime.isSameOrAfter(oct) && thisTime.isSameOrBefore(dec)) {
    set_quarter = quarter["q1"];
    set_timeline = timeline["q1"];
    // Q2 Jan 1 - Mar 31
  } else if (thisTime.isSameOrAfter(jan) && thisTime.isSameOrBefore(mar)) {
    set_quarter = quarter["q2"];
    set_timeline = timeline["q2"];
    //Q3 1 Apr -30 Jun
  } else if (thisTime.isSameOrAfter(apr) && thisTime.isSameOrBefore(jun)) {
    set_quarter = quarter["q3"];
    set_timeline = timeline["q3"];
    //Q4 1 jul 30 sep
  } else if (thisTime.isSameOrAfter(jul) && thisTime.isSameOrBefore(sep)) {
    set_quarter = quarter["q4"];
    set_timeline = timeline["q4"];
  }

  return { quarter: set_quarter, timeline: set_timeline, year: year };
}

export default formEmailKPI;
