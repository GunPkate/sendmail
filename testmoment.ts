
import Handlebars from 'handlebars';
import moment from "moment";


let now = moment("01 Jan 2000");
console.log(now);
const dec = `${moment().format("YYYY")}-12-31`
const sep = `${moment().format("YYYY")}-09-30`
const jun = `${moment().format("YYYY")}-06-30`
const mar = `${moment().format("YYYY")}-03-31`
console.log(dec);
const x1 =now.isSameOrBefore(dec)
const x2 =now.isSameOrAfter(sep)

const x3 =now.isSameOrBefore(sep)
const x4 =now.isSameOrBefore(dec)
console.log(x1);
console.log(x2);
console.log(x3);
console.log(x4);