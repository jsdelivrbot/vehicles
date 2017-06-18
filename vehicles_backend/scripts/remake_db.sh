#!/bin/bash

cd ../vehicles/vehicles
rm -R migrations
pwd

sleep 5

mysql --user="root" --execute="CREATE USER 'vehicles'@'localhost' IDENTIFIED BY '$VEHICLES_DB_PASSWORD';"
mysql --user="root" --execute="GRANT ALL ON vehiclesdb.* TO 'vehicles'@'localhost';"
mysql --user="root" --execute="DROP DATABASE vehiclesdb;"
mysql --user="root" --execute="CREATE DATABASE vehiclesdb;"

python manage.py db init
python manage.py db migrate
python manage.py db upgrade

cd ..
