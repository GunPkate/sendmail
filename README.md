# sendmail

## list of tech
Javascript
NodeJS : Hapi + TypeORM
Npm nodemailer
Npm moment
Npm handlebars
MySQL

Function  
REST API 
Method: POST

leaseMailController(con)
-getDebtList()  
query without parameter return result of joined table

-Sendmail_leasing(body,emails) 

-leasingEmail(body) 	
Account Receivable: each leasee doest not have the same "Due Date". As a result, email will be different + attachment such as logo may be different

-setData(debtList: debtList) { 
    let data = {
    deptname: deptname,
    subject: subject,
    leasee: leasee,
    date: date,
    debt: debt,
    enp_name: enp_name,
  };
}
leasee doest not have the same pararmeter  
use loop to input different set of params

Handlebars 
edit email template by using css and html
also embled image id into logo

nodemailer send mial api
maybe for loop different departments email may have different contents according to departments
![image](https://user-images.githubusercontent.com/77183620/199648472-a25fd079-c8c5-4397-b126-8dcf72c88ff7.png)

![image](https://user-images.githubusercontent.com/77183620/199648933-617ecf55-1950-4aff-afe6-8ce6158465f5.png)

![image](https://user-images.githubusercontent.com/77183620/199650308-d011762e-8b71-4d8f-a0b2-d0a5ebed536e.png)

attach image in email  
https://stackoverflow.com/questions/48449379/embed-image-in-email-body-nodemailer-nodejs




```
|Method| api url|
|GET |http://localhost:3000/lease/debts|
|POST|http://localhost:3000/lease/debts|
```