#!/bin/sh
# Wait for the database to be ready
while ! nc -z $DB_HOST 3306; do
  echo "Waiting for the database..."
  sleep 2
done

# Run database migrations
npx knex migrate:latest

# Start the application
npm start
