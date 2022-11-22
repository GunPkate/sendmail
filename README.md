# sendmail

|list of tech|
|---|
Javascript
NodeJS : Hapi + TypeORM
Npm nodemailer
Npm moment
Npm handlebars
MySQL
|

|Function  REST API Method: POST| Description|
|---|---|
leaseMailController(con)| -getDebtList()  query without parameter return result of joined table|
|-Sendmail_leasing(body,emails) |-leasingEmail(body) 	Account Receivable: each leasee doest not have the same "Due Date". As a result, email will be different + attachment such as logo may be different|
|Handlebars| edit email template by using css and html also embled image id into logo|
|nodemailer| send mial api maybe for loop different departments email may have different contents according to departments|
|-setData(debtList: debtList) |leasee doest not have the same pararmeter use loop to input different set of params|
   ```
   let data = {
    deptname: deptname,
    subject: subject,
    leasee: leasee,
    date: date,
    debt: debt,
    enp_name: enp_name,
  };
  ```

|Method| api url| Image|
|---|---|---|
|GET |http://localhost:3000/lease/debts|![image](https://user-images.githubusercontent.com/77183620/203180688-0e0afe88-f151-4afa-96e6-aaca880fc014.png)|
|POST|http://localhost:3000/lease/debts|![image](https://user-images.githubusercontent.com/77183620/203179531-80a43db2-d1cc-4e84-98e3-23d67b78f6bc.png)|

|Description| Image|
|---|---|
| email example|![image](https://user-images.githubusercontent.com/77183620/203179734-bdbd88cd-e22d-4e7f-b8d6-c64739ae5f85.png)|
| ERD |![image](https://user-images.githubusercontent.com/77183620/203297493-eb1e84e8-375f-429b-8c0c-4ff51eb1086b.png)
|



