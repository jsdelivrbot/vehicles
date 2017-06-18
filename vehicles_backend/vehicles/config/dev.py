
from __future__ import division
from __future__ import absolute_import
from __future__ import print_function
from __future__ import unicode_literals

import os

TESTING = False
DEBUG = True

SQLALCHEMY_DATABASE_URI='mysql+pymysql://vehicles:{db_password}@localhost/vehiclesdb'.format(db_password=os.environ.get('VEHICLES_DB_PASSWORD'))
SQLALCHEMY_TRACK_MODIFICATIONS = True
