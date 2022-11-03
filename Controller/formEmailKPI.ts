import moment from "moment";
import Handlebars from "handlebars";
import { source } from "./PDFtemplate/source";
import fs from "fs";
import path from "path";

function formEmailKPI(department: string): Array<string> {
  const quarter = { q1: 1, q2: 2, q3: 3, q4: 4 };
  const year = +moment().format("YYYY") + 543;
  let timeline = {
    q1: `วันที่ 1 ธันวาคม พ.ศ. ${year} ถึงวันที่ 31 ธันวาคม พ.ศ. ${year}`,
    q2: `วันที่ 1 มีนาคม  พ.ศ. ${year} ถึงวันที่ 31 มีนาคม  พ.ศ. ${year}`,
    q3: `วันที่ 1 มิถุนายน พ.ศ. ${year} ถึงวันที่ 31 มิถุนายน พ.ศ. ${year}`,
    q4: `วันที่ 1 กันยายน พ.ศ. ${year} ถึงวันที่ 31 กันยายน พ.ศ. ${year}`,
  };

  const checkMonth: Number = parseInt(moment().format("MM"));
  let set_quarter: Number = 0;
  let set_timeline: string = "";

  switch (checkMonth) {
    case 3:
      set_quarter = quarter["q2"];
      set_timeline = timeline["q2"];
      break;
    case 6:
      set_quarter = quarter["q3"];
      set_timeline = timeline["q3"];
      break;
    case 9:
      set_quarter = quarter["q4"];
      set_timeline = timeline["q4"];
      break;
    case 12:
      set_quarter = quarter["q1"];
      set_timeline = timeline["q1"];
      break;
    default:
      set_quarter = quarter["q4"];
      set_timeline = timeline["q4"];
  }

  let data = {
    name: department,
    // name: "วิทยาการคอมพิวเตอร์",
    emp_name: "สมชาย เอ",
    tel: "0821114544",
    emails: [{ mail: "g1@gmail.com" }, { mail: "a1@gmail.com" }],
    subject: `แจ้งกำหนดการรายงานผลตัวชี้วัด SDA และ KPI ประจำปีงบประมาณ ${year} สำหรับหน่วยงานหรือภาควิชา`,
    quarter: set_quarter,
    time: set_timeline,
  };

  // const html = fs.readFileSync(path.join(__dirname, "PDFtemplate/KPISDA.hbs"), {
  //   encoding: "utf-8",
  // });
  // console.log(path.join(__dirname, "PDFtemplate/KPISDA.html"));

  // var source =
  //   "<p>เรียน {{name}}" +
  //   "{{name}} สามารถเข้าระบบ เพื่อรายงานผลตัวชี้วัด และ ในไตรมาสที่ 1 ประจำปีงบประมาณ 2565 ภายในวันที่ 1 ธันวาคม พ.ศ. 2565 ถึงวันที่ 31 ธันวาคม พ.ศ. 2565</p>" +
  //   "จึงเรียนมาเพื่อทราบ" +
  //   "งานฝ่ายแผนและงบประมาณ" +
  //   "ข้อมูลการติดต่อ" +
  //   "{{emp_name}}" +
  //   "โทร.{{tel}}" +
  //   "Email:" +
  //   "<ul>{{#emails}} <li>{{name}}</li>{{/emails}} </ul>";
  let template = Handlebars.compile(source);
  // let template = Handlebars.compile(html);

  let result = template(data);
  console.log(result, moment().format("DD-MM-YYYY hh:mm:ss"));
  return [data.subject, result];
}

export default formEmailKPI;
