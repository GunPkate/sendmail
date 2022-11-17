const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")

// const emailTemplate = fs.readFileSync(path.join(__dirname, "/templates/index.handlebars"), "utf-8")
const emailTemplate = fs.readFileSync(path.join(__dirname, "Controller/PDFtemplate/KPISDA.hbs"), "utf-8")
// const template = handlebars.compile(emailTemplate)
const template = handlebars.compile(emailTemplate)

const messageBody = (template({
name: "David Islo", 
interviewer: "Scott Greenwich"
}))
    console.log(messageBody)