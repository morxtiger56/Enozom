Create a '.env' file in the app directory with the following content:

- MySQL_HOST=127.0.0.1
- MySQL_PORT=3306
- MySQL_DB=DB
- MySQL_DB_TEST=DB_TEST
- MySQL_USER=YOUR_MYSQL_USER
- MySQL_PASSWORD=YOUR_MYSQL_PASSWORD

```
npm install - g db-migrate
npm install --save db-migrate-mysql
Create a database named 'DB' and 'DB_TEST' in MySQL.
db-migrate up -e test    // create all tables
db-migrate reset -e test // delete all tables
```