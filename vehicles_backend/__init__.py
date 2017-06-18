# -*- coding: utf-8 -*-
# pylint: disable-msg=C0103

# from flask import Flask
# from flask.ext.sqlalchemy import SQLAlchemy
# from flask.ext.script import Manager
# from flask.ext.migrate import Migrate, MigrateCommand
# from sqlalchemy.schema import UniqueConstraint
# from sqlalchemy import exc
#
# from sqlalchemy import Table, Column, Integer, String, VARCHAR, LargeBinary, UnicodeText
# from sqlalchemy.orm import mapper
# import configparser
#
# config = configparser.ConfigParser()
# config.readfp(open(r'systemConfig.txt'))
#
# import sys
# sys.path.append("vehicleapp")
#
# # Create an Instance of Flask
# app = Flask(__name__)
#
# # Include config from config.py
# app.config.from_object('config')
#
# # Create an instance of SQLAclhemy
# db = SQLAlchemy(app)
#
# migrate = Migrate(app, db)
#
# manager = Manager(app)
# manager.add_command('db', MigrateCommand)
# from vehicleapp.models import serviceType
# from models import vehicleType
# from models import vehicleCondition
# from models import location
# from models import zipcode
# from models import availableServices
# from models import specialServices
