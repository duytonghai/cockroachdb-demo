-- cockroach sql --insecure --database=startrek --user=maxroach < products.sql

create table products (
	id INT,
	name VARCHAR(50),
	quantity INT
);

insert into products (id, name, quantity) values (1, 'Flour - Teff', 77);
insert into products (id, name, quantity) values (2, 'Lid Coffee Cup 8oz Blk', 21);
insert into products (id, name, quantity) values (3, 'Cake - Bande Of Fruit', 88);
insert into products (id, name, quantity) values (4, 'Dawn Professionl Pot And Pan', 64);
insert into products (id, name, quantity) values (5, 'Cattail Hearts', 50);
insert into products (id, name, quantity) values (6, 'Pork - Backfat', 42);
insert into products (id, name, quantity) values (7, 'Soup - Campbells Beef Strogonoff', 34);
insert into products (id, name, quantity) values (8, 'Bar Nature Valley', 48);
insert into products (id, name, quantity) values (9, 'Bananas', 100);
insert into products (id, name, quantity) values (10, 'Chocolate - Feathers', 70);
insert into products (id, name, quantity) values (11, 'Cheese Cloth', 38);
insert into products (id, name, quantity) values (12, 'Crush - Orange, 355ml', 85);
insert into products (id, name, quantity) values (13, 'Wine - Chianti Classica Docg', 82);
insert into products (id, name, quantity) values (14, 'Wine - Cahors Ac 2000, Clos', 24);
insert into products (id, name, quantity) values (15, 'Wine - Pinot Grigio Collavini', 76);
insert into products (id, name, quantity) values (16, 'Lamb - Whole Head Off', 73);
insert into products (id, name, quantity) values (17, 'Grapes - Green', 89);
insert into products (id, name, quantity) values (18, 'Pail - 15l White, With Handle', 62);
insert into products (id, name, quantity) values (19, 'Longan', 37);
insert into products (id, name, quantity) values (20, 'Cake - Cheese Cake 9 Inch', 67);
insert into products (id, name, quantity) values (21, 'Lobster - Tail, 3 - 4 Oz', 38);
insert into products (id, name, quantity) values (22, 'Crab - Claws, Snow 16 - 24', 64);
insert into products (id, name, quantity) values (23, 'Nutmeg - Ground', 23);
insert into products (id, name, quantity) values (24, 'Ecolab - Ster Bac', 32);
insert into products (id, name, quantity) values (25, 'Cheese - Cheddarsliced', 70);
insert into products (id, name, quantity) values (26, 'Wine - German Riesling', 35);
insert into products (id, name, quantity) values (27, 'Olives - Kalamata', 39);
insert into products (id, name, quantity) values (28, 'Cheese - Gouda Smoked', 67);
insert into products (id, name, quantity) values (29, 'Eggroll', 43);
insert into products (id, name, quantity) values (30, 'Cheese - Brick With Onion', 77);
insert into products (id, name, quantity) values (31, 'Pastry - Carrot Muffin - Mini', 83);
insert into products (id, name, quantity) values (32, 'Yogurt - Raspberry, 175 Gr', 72);
insert into products (id, name, quantity) values (33, 'Cup - 3.5oz, Foam', 88);
insert into products (id, name, quantity) values (34, 'Coconut - Creamed, Pure', 15);
insert into products (id, name, quantity) values (35, 'Kiwano', 38);
insert into products (id, name, quantity) values (36, 'Devonshire Cream', 59);
insert into products (id, name, quantity) values (37, 'Beans - Black Bean, Canned', 60);
insert into products (id, name, quantity) values (38, 'Stock - Beef, Brown', 20);
insert into products (id, name, quantity) values (39, 'Coffee - Irish Cream', 80);
insert into products (id, name, quantity) values (40, 'Flower - Dish Garden', 3);
insert into products (id, name, quantity) values (41, 'Quail - Jumbo', 50);
insert into products (id, name, quantity) values (42, 'Banana - Green', 94);
insert into products (id, name, quantity) values (43, 'Wine - Harrow Estates, Vidal', 20);
insert into products (id, name, quantity) values (44, 'Napkin - Beverge, White 2 - Ply', 21);
insert into products (id, name, quantity) values (45, 'Potatoes - Idaho 100 Count', 50);
insert into products (id, name, quantity) values (46, 'Wine - Sicilia Igt Nero Avola', 47);
insert into products (id, name, quantity) values (47, 'Lettuce - Red Leaf', 41);
insert into products (id, name, quantity) values (48, 'Lid - Translucent, 3.5 And 6 Oz', 36);
insert into products (id, name, quantity) values (49, 'Blueberries - Frozen', 36);
insert into products (id, name, quantity) values (50, 'Cookie - Dough Variety', 75);
