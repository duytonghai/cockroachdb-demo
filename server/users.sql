create table users (
	id INT,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
	pwd VARCHAR(50),
	gender VARCHAR(50),
	ip_address VARCHAR(20),
	timezone VARCHAR(100)  -- America/Knox_IN
);
insert into users (id, first_name, last_name, email, gender, ip_address, timezone) values (1, 'Abby', 'Docket', 'test1@gmail.com', '123456', 'Female', '195.155.16.98', 'America/New_York');
insert into users (id, first_name, last_name, email, gender, ip_address, timezone) values (2, 'Etheline', 'Le Brun', 'test2@gmail.com', '123456', 'Female', '159.100.6.72', 'Asia/Bangkok');
