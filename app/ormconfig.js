module.exports = {  
  "type": "mysql",  // postgres, mysql
  "host": "localhost",  
  "port": 3306,  
  "username": "root",  
  "password": "Welcome@123",  
  "database": "SnakeLadder",  
  "dropSchema" : false,  
  "entities": ["./src/entity/**/*.ts"],  // path to domain classes
  "migrationsTableName": "migrations",  
  "migrations": ["./src/migrations/**/*.ts"],  // path to migrations directory
  "cli": {  
    "migrationsDir": "./src/migrations"  
  }  
}