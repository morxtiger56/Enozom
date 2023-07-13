#!/bin/bash

# Load environment variables from .env file
if [[ -f .env ]]; then
    source .env
fi

# Check if the required variables are set
if [[ -z "$MySQL_USER" || -z "$MySQL_PASSWORD" || -z "$MySQL_DB_TEST" ]]; then
    echo -e "MySQL credentials or database name not found in .env file.\n"
    exit 1
fi

# Check if the database exists
mysql -u"$MySQL_USER" -p"$MySQL_PASSWORD" -e "USE $MySQL_DB_TEST" >/dev/null 2>&1
DB_EXISTS=$?

# Drop the database if it exists
if [ $DB_EXISTS -eq 0 ]; then
    mysql -u"$MySQL_USER" -p"$MySQL_PASSWORD" -e "DROP DATABASE $MySQL_DB_TEST"
    echo -e "Database $DATABASE_NAME dropped.\n"
fi

# Recreate the database
mysql -u"$MySQL_USER" -p"$MySQL_PASSWORD" -e "CREATE DATABASE $MySQL_DB_TEST"
echo -e "Database $MySQL_DB_TEST created.\n"

# Start the MySQL server
#sudo service mysql start   

# Run db-migrate command
db-migrate up -e test
echo -e "Migration for $MySQL_DB_TEST is done.\n"

# Run the seed
npx ts-node ./src/seed.ts
echo -e "Seed for $MySQL_DB_TEST is done.\n"

# start the server
npm start watch &
echo -e "server started successfully.\n"

# start the server
gnome-terminal --tab --title="react.js Client" -- bash -c "cd ../frontend; npm start"
echo -e "frontend started successfully.\n"
