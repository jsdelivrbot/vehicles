# from flask import Flask, render_template
from flask import render_template
import logging
from logging.handlers import RotatingFileHandler
import os
import pymysql.cursors
from flask import jsonify

import json
import binascii
import zlib
import time
import datetime
from urllib.request import urlopen

import boto

import sys
from __init__ import app, config

from vehicleapp.views import googlecloudapiimages
from vehicleapp.views import serviceTypeView
from vehicleapp.views import vehicleTypeView
from vehicleapp.views import zipcodeView
from vehicleapp.views import locationView
from vehicleapp.views import vehicleConditionView
from vehicleapp.views import availableServicesView
from vehicleapp.views import specialServicesView

import shutil
import tempfile
# import oauth2_plugin
# import oauth2_client
# import gcs_oauth2_boto_plugin

# get local config data
cfgserverport = config.get('PythonServerData',
    'VEHICLE_SERVICE_PORT')

# Use server environment config data if available.
tmpserverport = int(os.environ.get('VEHICLE_SERVICE_PORT2',
    cfgserverport))

@app.route('/')
def index():
    #  app.log                                                                                                                            ger.warning('testing warning log')

    # app.logger.error('testing error log')
    # http://127.0.0.1:53000/
    app.logger.info('testing info log')

    return render_template('index.html')



if __name__ == '__main__':
            # initialize the log handler
    # logHandler = RotatingFileHandler(
    #    'vehicle_app_routes_call.log', maxBytes=1000, backupCount=1)

    # set the log handler level
    # logHandler.setLevel(logging.INFO)

    # set the app logger level
    # app.logger.setLevel(logging.INFO)

    # app.logger.addHandler(logHandler)

    app.run(debug=True, port=tmpserverport)
