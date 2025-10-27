#!/bin/sh

echo "⏳ Waiting for database to be ready..."

# Wait for MySQL to be ready
until mysqladmin ping -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASSWORD" --skip-ssl --silent 2>/dev/null; do
  echo "⏳ Database is unavailable - sleeping for 2 seconds..."
  sleep 2
done

echo "✅ Database is ready!"
