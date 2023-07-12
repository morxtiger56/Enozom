Create a '.env' file in the app directory with the following content:

- MySQL_HOST=127.0.0.1
- MySQL_PORT=3306
- MySQL_DB=DB
- MySQL_DB_TEST=DB_TEST
- MySQL_USER=YOUR_MYSQL_USER
- MySQL_PASSWORD=YOUR_MYSQL_PASSWORD

### Inside the app directory, run the following commands:
```
npm install
npm install -g db-migrate
npm install --save db-migrate-mysql
Create a database named 'DB' and 'DB_TEST' in MySQL.
db-migrate up -e test    // create all tables
db-migrate reset -e test // delete all tables
```

## API Documentation
POST /user/login/
POST /user/signup/

Both endpoints takes `username` and `password`, and return a JWT token that is used to authenticate the user in the other endpoints.
For the route `/game/`, user must be authenticated to access any of its content.

GET /game/play?action=join|create|listGames
For the action `join`, the ///////////// To be continued...
