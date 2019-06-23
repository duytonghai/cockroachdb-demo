# cockroachdb-demo

## Database
### Create database
* cd `./server`
* Start docker node `docker-compose up`
* Access Cockroach Database `cockroach sql --insecure`
* Create user `CREATE USER IF NOT EXISTS maxroach;`
* Create database `CREATE DATABASE dev2ta_demo;`
* Give the `maxroach` user permission `GRANT ALL ON DATABASE dev2ta_demo TO maxroach;`

### Migration
Run below commands to create tables and init fixture data
* Create table users `node ./migrations/20190623034116-create-user.js`
* Create table categories `node ./migrations/20190623034229-create-category.js`
* Create table products `node ./migrations/20190623033553-create-product.js`
* Create table orders `node ./migrations/20190623033844-create-order.js`

### Server
* cd `./server`
* Run `yarn` or `npm install` to install packages
* Run `yarn start`
* Check with endpoint `localhost:3000/products` on your local

### Client
* cd `./client`
* Run `yarn` or `npm install` to install packages
* Run `PORT=9000 yarn start` to run client app
