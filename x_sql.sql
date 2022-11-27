drop DATABASE leasing;
CREATE DATABASE leasing;

insert into customerdetails (FirstName,LastName,email,contact,address) VALUES('สมชาย','สว่าง','gundash1@gmail.com','0822224455','Bangkok');
insert into customerdetails (FirstName,LastName,email,contact,address) VALUES('ทมิฬ','มือไว','gundash1@hotmail.com','0822224655','Bangkok');
insert into customerdetails (FirstName,LastName,email,contact,address) VALUES('ดำ','ร้อนเงิน','gpu.gun_st@tni.ac.th','0822224644','Bangkok');

insert into debttypes (debttype) VALUES('สินเชื่อส่วนบุคคล');
insert into debttypes (debttype) VALUES('หนี้บัตรเครดิต');

insert into debtstatus (debtstatus) VALUES('ชำระแล้ว');
insert into debtstatus (debtstatus) VALUES('ลูกหนี้สินเชื่อ');

insert into departments (departmentName) VALUES('ลูกหนี้ทั่วไป');
insert into departments (departmentName) VALUES('แผนกเร่งรัดหนี้');

insert into employees (firstName,lastName,departmentId) VALUES('เสือ','ยึดทรัพย์',2);
insert into employees (firstName,lastName,departmentId) VALUES('ละมุน','ไมตรี',1);

insert into customers (CustomerDetailId) VALUES(1);
insert into customers (CustomerDetailId) VALUES(2);
insert into customers (CustomerDetailId) VALUES(3);

INSERT into debts (balance,customerId,debtTypeID,debtstatusid) values (7000,1,1,2);
INSERT into debts (balance,customerId,debtTypeID,dueAt,debtstatusid) values (7000,2,1,'2022-06-21',1);
INSERT into debts (balance,customerId,debtTypeID,dueAt,debtstatusid) values (20000,2,1,'2022-06-21',2);
INSERT into debts (balance,customerId,debtTypeID,dueAt,debtstatusid) values (200000,2,1,'2022-09-21',2);
INSERT into debts (balance,customerId,debtTypeID,dueAt,debtstatusid) values (7000,3,1,'2022-06-21',2);

Select 
c.customerId,	FirstName,	LastName,email,	balance,	dueAt,dt.debtTypeID,dt.debtType,ds.debtstatusId,ds.debtstatus

from customers c 
Join customerdetails d on d.customerDetailId = c.customerDetailId
JOIN debts db on db.customerId = c.customerId
join debttypes dt on dt.DebtTypeId = db.debtTypeID
join debtstatus ds on ds.debtstatusId = db.debtstatusId