drop DATABASE leasing;
CREATE DATABASE leasing;

insert into customerdetails (FirstName,LastName,email,contact,address) VALUES('สมชาย','สว่าง','gundash1@gmail.com','0822224455','Bangkok');
insert into customerdetails (FirstName,LastName,email,contact,address) VALUES('ทมิฬ','มือไว','gundash1@hotmail.com','0822224655','Bangkok');

insert into debttypes (debttype) VALUES('สินเชื่อส่วนบุคคล');
insert into debttypes (debttype) VALUES('หนี้บัตรเครดิต');

insert into departments (departmentName) VALUES('ลูกหนี้ทั่วไป');
insert into departments (departmentName) VALUES('แผนกเร่งรัดหนี้');

insert into employees (firstName,lastName,departmentId) VALUES('เสือ','ยึดทรัพย์',2);
insert into employees (firstName,lastName,departmentId) VALUES('ละมุน','ไมตรี',1);

insert into customers (CustomerDetailId) VALUES(1);
insert into customers (CustomerDetailId) VALUES(2);

INSERT into debts (balance,customerId,debtTypeID) values (7000,1,1);
INSERT into debts (balance,customerId,debtTypeID,dueAt) values (7000,2,1,'2022-06-21');

Select * 
from customers c 
Join customerdetails d on d.customerDetailId = c.customerDetailId
JOIN debts db on db.customerId = c.customerId 