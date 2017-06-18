from flask import render_template, request, flash, redirect, url_for
from __init__ import app, db
from __init__ import exc

from __init__ import config
import os
import urllib
import io
import base64
    
cfglocaldir = config.get('ServerLocalFileData', 'UPLOAD_IMAGE_LOCAL_DIR')
tmplocaldir = os.environ.get('LFileData_UPLOAD_IMAGE_LOCAL_DIR', cfglocaldir)

import sys
from models.availableServices import AvailableServices
from models.vehicleType import VehicleType
from models.serviceType import ServiceType
import json

@app.route('/listavailableserviceimages', methods=['POST', 'GET'])
def listavailableserviceimages():
    # http://127.0.0.1:53000/listavailableserviceimages
    print("inside listavailableserviceimages")

    temp_list = []
    for temp_file in os.listdir(tmplocaldir):
        if temp_file.endswith("_before.png"):
            temp_asl = {}
            temp_file_words = temp_file.split("_")
            print("before_clean_image temp_file:"+temp_file)
            print("0:"+str(temp_file_words[0]))
            print("1:"+str(temp_file_words[1]))
            print("2:"+str(temp_file_words[2]))

            temp_asl = {
                "vehicle_type_id":temp_file_words[0][1:],
                "service_type_id":temp_file_words[1][1:]
            }
            temp_asl['before_clean_image'] = tmplocaldir+"/"+temp_file
            
            tmpimglocalfilename = tmplocaldir+ \
                "/v"+str(temp_file_words[0][1:])+ \
                "_s"+str(temp_file_words[1][1:])+ \
                "_after.png"
            #    "_vc"+str(temp_available_services_list.vehicle_condition_id)+ \
            if os.path.isfile(tmpimglocalfilename) and os.access(tmpimglocalfilename, os.R_OK):
                temp_asl['after_clean_image'] = tmpimglocalfilename
                print("after_clean_image:"+temp_asl['after_clean_image'])
            else:
                temp_asl['after_clean_image'] = ""

            temp_list.append(temp_asl)

    return app.response_class(json.dumps(temp_list), content_type='application/json')


@app.route('/listavailableservices', methods=['POST', 'GET'])
def listavailableservices():
    # http://127.0.0.1:53000/listavailableservices
    print("inside listavailableservices")
    available_services_list = db.session.query(AvailableServices)
    
    temp_list = []
    for temp_available_services_list in available_services_list:
        
        temp_asl = {
            "id":temp_available_services_list.id,
            "vehicle_type_id":temp_available_services_list.vehicle_type_id,
            "service_type_id":temp_available_services_list.service_type_id,
            "vehicle_condition_id":temp_available_services_list.vehicle_condition_id,
            "base_price": temp_available_services_list.base_price
        }
        temp_list.append(temp_asl)
        print("base_price:" + str(temp_available_services_list.base_price))
        print("id:" + str(temp_available_services_list.id))
        print("service_type_id:" + str(temp_available_services_list.service_type_id))
        print("vehicle_condition_id:" + str(temp_available_services_list.vehicle_condition_id))
        print("base_price:" + str(temp_available_services_list.base_price))
        print("--------------------")

    return app.response_class(json.dumps(temp_list), content_type='application/json')

@app.route('/deleteavailableservices', methods=['POST', 'GET'])
def deleteavailableservices():
    # http://127.0.0.1:53000/addavailableservices
    print("inside 2 deleteavailableservices")
    data = request.get_json()
    print("deleteavailableservices input : " + json.dumps(data))
    print("deleteavailableservices input id: " + str(data['id']))
    try:
        AvailableServices.query.filter_by(id=data['id']).delete()
        db.session.commit()
    except Exception: 
        print("No AvailableServices record in DB")
        pass
        print("Other exception")
        response = {
            "status" : False,
            "description" : "unknown error deleting AvailableServices info"
        }
        return app.response_class(json.dumps(response), content_type='application/json') 

    finally:
        print("Deleted the AvailableServices data from DB")

    response = (
        {
            "status": True,
            "description": "Deleted the AvailableServices data from DB"
        }
    )

    return app.response_class(json.dumps(response), content_type='application/json')

# return render_template('add.html')
@app.route('/editavailableserviceimages', methods=['POST', 'GET'])
def editavailableserviceimages():
    # http://127.0.0.1:53000/addavailableservices
    print("inside 2 editavailableserviceimages")
    data = request.get_json()
    print("editavailableserviceimages input vehicleTypeId: " + str(data['vehicleTypeId']))
    print("editavailableserviceimages input serviceTypeId: " + str(data['serviceTypeId']))

    if (data['BCImage'] and (len(data['BCImage']) > 0)):
        tmpimglocalfilename = tmplocaldir+ \
            "/v"+str(data['vehicleTypeId'])+ \
            "_s"+str(data['serviceTypeId'])+ \
            "_before.png"
        if os.path.isfile(tmpimglocalfilename):
            oldtmpimglocalfilename = tmplocaldir+ \
                "/old_v"+str(data['vehicleTypeId'])+ \
                "_s"+str(data['serviceTypeId'])+ \
                "_before.png"
            if os.path.isfile(oldtmpimglocalfilename):
                os.remove(oldtmpimglocalfilename)
                print("deleted old file:"+oldtmpimglocalfilename)
            # os.rename(tmpimglocalfilename, oldtmpimglocalfilename)
            print("rename file:"+oldtmpimglocalfilename)
        fh = open(tmpimglocalfilename, "wb")
        imgData = base64.b64decode(data['BCImage'])
        fh.write(imgData)
        #fh.close
        fh.close()
        print("before tmpimglocalfilename:"+tmpimglocalfilename)

    if (data['ACImage'] and (len(data['ACImage']) > 0)):
        tmpimglocalfilename = tmplocaldir+ \
            "/v"+str(data['vehicleTypeId'])+ \
            "_s"+str(data['serviceTypeId'])+ \
            "_after.png"
        if os.path.isfile(tmpimglocalfilename):
            oldtmpimglocalfilename = tmplocaldir+ \
                "/old_v"+str(data['vehicleTypeId'])+ \
                "_s"+str(data['serviceTypeId'])+ \
                "_after.png"
            if os.path.isfile(oldtmpimglocalfilename):
                os.remove(oldtmpimglocalfilename)
                print("deleted old file:"+oldtmpimglocalfilename)
            # os.rename(tmpimglocalfilename, oldtmpimglocalfilename)
            print("rename file:"+oldtmpimglocalfilename)
        fh = open(tmpimglocalfilename, "wb")
        imgData = base64.b64decode(data['ACImage'])
        fh.write(imgData)
        #fh.close
        fh.close()
        print("after tmpimglocalfilename:"+tmpimglocalfilename)

    response2 = (
        {
            "status": True,
            "description": "Image successfully posted"
        }
    )

    return app.response_class(json.dumps(response2), content_type='application/json')

# return render_template('add.html')
@app.route('/editavailableservices', methods=['POST', 'GET'])
def editavailableservices():
    # http://127.0.0.1:53000/addavailableservices
    print("inside 2 editavailableservices")
    data = request.get_json()
    print("editavailableservices input vehicleTypeId: " + str(data['vehicleTypeId']))
    recexists = 0
    db_last_apicall_date = ""

    l_avail_serv = db.session.query(AvailableServices).filter_by(vehicle_type_id=data['vehicleTypeId'],
        service_type_id=data['serviceTypeId'],
        vehicle_condition_id=data['vehicleConditionId']  )

    response2 = ""

    try:
        record = l_avail_serv.one()
        recexists = 1
        
    except Exception: 
        print("No AvailableServices record in DB")
        pass
    finally:
        print("AvailableServices data exists in DB")

    if ( recexists == 1):
        print("existing AvailableServices data")
        print("id:"+str(record.id))
        print("vehicle_type_id:"+str(record.vehicle_type_id))
        print("service_type_id:"+str(record.service_type_id))
        print("vehicle_condition_id:"+str(record.vehicle_condition_id))
        print("base_price:"+str(record.base_price))
        print("tmplocaldir:"+tmplocaldir)
        print("--------------------------")

    if ( recexists == 1) and (l_avail_serv.count() > 0):
        print("trying to update new values")
        print("basePrice:"+data['basePrice'])
        record.base_price = data['basePrice']       
        
    if ( recexists == 0):

        availableservices = AvailableServices(data['vehicleTypeId'],
                                              data['serviceTypeId'],
                                              data['vehicleConditionId'],
                                              data['basePrice'])
        
        db.session.add(availableservices)      

    exceptio_info=0
    try:

        db.session.commit()

    except exc.IntegrityError as err:
        print("exception")
        db.session.rollback()
        if "Duplicate entry" in str(err):
            print("Duplicate exception")
            exceptio_info = 1
            response = {
                    "status" : False,
                    "description" : "IntegrityError error, AvailableServices already exists"
                }
            return  app.response_class(json.dumps(response), content_type='application/json')
        else:
            print("Other exception")
            response = {
                    "status" : False,
                    "description" : "unknown error adding/updating AvailableServices info"
                }
            return app.response_class(json.dumps(response), content_type='application/json') 

    finally:

            print("finally")
    if ( exceptio_info>0):
        response2 = (
            {
                "status": False,
                "description": "Exception occured while processing record"
            }
        )
    if ( exceptio_info == 0):
        response2 = (
            {
                "status": True,
                "description": "New entry was successfully posted"
            }
        )

    return app.response_class(json.dumps(response2), content_type='application/json')