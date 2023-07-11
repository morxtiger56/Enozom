module.exports = {  
  "type": "mysql",  // postgres, mysql
  "host": "localhost",  
  "port": 3306,  
  "username": "root",  
  "password": "password",  
  "database": "dp_test",  
  "dropSchema" : false,  
  "entities": ["./src/entity/**/*.ts"],  // path to domain classes
  "migrationsTableName": "migrations",  
  "migrations": ["./src/migrations/**/*.ts"],  // path to migrations directory
  "cli": {  
    "migrationsDir": "./src/migrations"  
  }  
}