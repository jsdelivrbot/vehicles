from flask import render_template, request, flash, redirect, url_for
from __init__ import app, db
from __init__ import exc

import sys
from models.vehicleCondition import VehicleCondition
import json

@app.route('/addvehiclecondition', methods=['POST', 'GET'])
def addvehiclecondition():
    # http://127.0.0.1:53000/addvehiclecondition
    print("inside addvehiclecondition")
    data = request.get_json() or request.form
    print("response : "+ json.dumps(data))
    print("response vehiclecondition: "+ data['condition'])
    vehiclecondition = VehicleCondition(condition=data['condition'])
    db.session.add(vehiclecondition)
    db.session.commit()
    flash('New entry was successfully posted')
    response2 = (
        {
            "status": True,
            "description": "New entry was successfully posted"
        }
    )  
 
    return app.response_class(json.dumps(response2), content_type='application/json')
  
   
@app.route('/listvehiclecondition', methods=['POST', 'GET'])
def listvehiclecondition():
    # http://127.0.0.1:53000/listvehiclecondition
    print("inside listvehiclecondition")
    vehicle_condition_list = []

    vehiclecondition = db.session.query(VehicleCondition)
    for lvehiclecondition in vehiclecondition:
        vehicle_condition_list.append({
            "id":lvehiclecondition.id,
            "condition":lvehiclecondition.condition
            })     
 
    return app.response_class(json.dumps(vehicle_condition_list), content_type='application/json')
  
  # view for editing vehicle types
@app.route('/editvehiclecondition', methods=['POST', 'GET'])
def editvehiclecondition():
    # http://127.0.0.1:53000/editvehiclecondition
    print("inside 2 editvehiclecondition")
    data = request.get_json()
    print("editvehiclecondition input : " + json.dumps(data))
    print("editvehiclecondition input vehicleConditionId: " + str(data['vehicleCondition']))
    recexists = 0
    db_last_apicall_date = ""

    l_vehicleCondition = db.session.query(VehicleCondition).filter_by(id=data['id'])

    response2 = ""

    if (data['id']):
        try:
            record = l_avail_serv.one()
            recexists = 1
        except Exception: 
            print("No vehiclecondition record in DB")
            pass
        finally:
            print("vehiclecondition data exists in DB")

    if ( recexists == 1):
        print("existing vehicleCondition data")
        print("id:"+str(record.id))
        print("vehicle_condition:"+str(record.condition))
        

    if ( recexists == 1) and (l_vehicleCondition.count() > 0):
        print("trying to update new values")
        record.type = data['vehicleType']
        record.display_text = data['vdisplayText']

    if ( recexists == 0):

        vehiclecondition = VehicleCondition(condition=data['vehicleCondition'])
        db.session.add(vehiclecondition)      

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

@app.route('/deletevehiclecondition', methods=['POST', 'GET'])
def deletevehiclecondition():
    # http://127.0.0.1:53000/deletevehiclecondition
    print("inside 2 deletevehiclecondition")
    data = request.get_json()
    print("deletevehiclecondition input : " + json.dumps(data))
    print("deletevehiclecondition input id: " + str(data['id']))
    try:
        VehicleCondition.query.filter_by(id=data['id']).delete()
        db.session.commit()
    except Exception: 
        print("No VehicleCondition record in DB")
        pass
        print("Other exception")
        response = {
            "status" : False,
            "description" : "unknown error deleting VehicleCondition info"
        }
        return app.response_class(json.dumps(response), content_type='application/json') 

    finally:
        print("Deleted the VehicleCondition data from DB")

    response = (
        {
            "status": True,
            "description": "Deleted the VehicleCondition data from DB"
        }
    )

    return app.response_class(json.dumps(response), content_type='application/json')




