# DATABASE SETTINGS

import os
# below will be used to get environment variable data
# used if exists
mysql_db_username = os.environ.get('MYSQL_USER', 
    '')
mysql_db_password = os.environ.get('MYSQL_PASSWORD', 
    '')
mysql_db_name = os.environ.get('MYSQL_DB', 
    '')
mysql_db_hostname = os.environ.get('MYSQL_HOST', 
    '')
mysql_db_port = os.environ.get('MYSQL_PORT', 
    -1)
mysql_uri = os.environ.get('MYSQL_URI')

DEBUG = True
# PORT = 3306
# HOST = "0.0.0.0"
SQLALCHEMY_ECHO = False
# SECRET_KEY = "SOME SECRET"

SQLALCHEMY_TRACK_MODIFICATIONS = False
# MySQL

if mysql_uri:
    SQLALCHEMY_DATABASE_URI = "pymysql+"+mysql_uri
    print("using environment's db uri")
else:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_ADDR}:{DB_PORT}/{DB_NAME}".format(DB_USER=mysql_db_username,
                                                                                        DB_PASS=mysql_db_password,
                                                                                        DB_ADDR=mysql_db_hostname,
                                                                                        DB_PORT=mysql_db_port,
                                                                                        DB_NAME=mysql_db_name)
    print("using constructed db uri")