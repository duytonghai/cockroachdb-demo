-- cockroach sql --insecure --database=startrek --user=maxroach < orders.sql

create table orders (
	id INT,
	user_id INT,
	product_id INT,
	quantity INT,
	created_date TIMESTAMPTZ
);

insert into orders (id, user_id, product_id, quantity, created_date) values (1, 2, 10, 1, '2019-06-22 19:10:25+07');