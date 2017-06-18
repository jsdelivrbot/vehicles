from flask import render_template, request, flash, redirect, url_for
from __init__ import app, db
from __init__ import exc

import sys
from models.vehicleType import VehicleType
import json

@app.route('/addvehicletype', methods=['POST', 'GET'])
def addvehicletype():
    # http://127.0.0.1:53000/addvehicletype
    print("inside addvehicletype")
    data = request.get_json() or request.form
    print("response : "+ json.dumps(data))
    print("response serviceName: "+ data['vehicleType'])
    vehicleType = VehicleType(data['vehicleType'],
        data['vdisplayText'])
    db.session.add(vehicleType)
    db.session.commit()
    flash('New entry was successfully posted')
    response2 = (
        {
            "status": True,
            "description": "New entry was successfully posted"
        }
    )  
 
    return app.response_class(json.dumps(response2), content_type='application/json')
  
   
@app.route('/listvehicletypes', methods=['POST', 'GET'])
def listvehicletypes():
    # http://127.0.0.1:53000/listservicetypes
    print("inside listvehicletypes")
    vehicle_type_list = []

    vehicletype = db.session.query(VehicleType)
    for lvehicletype in vehicletype:
        vehicle_type_list.append({
            "id":lvehicletype.id,
            "type":lvehicletype.type,
            "display_text":lvehicletype.display_text
            })     
 
    return app.response_class(json.dumps(vehicle_type_list), content_type='application/json')
  
    # view for editing vehicle types
@app.route('/editvehicletypes', methods=['POST', 'GET'])
def editvehicletypes():
    # http://127.0.0.1:53000/editvehicletypes
    print("inside 2 editvehicletypes")
    data = request.get_json()
    print("editvehicletypes input : " + json.dumps(data))
    print("editvehicletypes input vehicleTypeId: " + str(data['vehicleType']))
    recexists = 0
    db_last_apicall_date = ""

    l_avail_serv = db.session.query(VehicleType).filter_by(id=data['id'])

    response2 = ""

    if (data['id']):
        try:
            record = l_avail_serv.one()
            recexists = 1
        except Exception: 
            print("No vehicletypes record in DB")
            pass
        finally:
            print("vehicletypes data exists in DB")

    if ( recexists == 1):
        print("existing vehicletypes data")
        print("id:"+str(record.id))
        print("vehicle_type:"+str(record.type))
        print("vdisplay_text:"+str(record.display_text))
        

    if ( recexists == 1) and (l_avail_serv.count() > 0):
        print("trying to update new values")
        record.type = data['vehicleType']
        record.display_text = data['vdisplayText']

    if ( recexists == 0):

        vehicletypes = VehicleType(data['vehicleType'],
                                              data['vdisplayText'])
        db.session.add(vehicletypes) 

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
                    "description" : "IntegrityError error, vehicleTypes already exists"
                }
            return  app.response_class(json.dumps(response), content_type='application/json')
        else:
            print("Other exception")
            response = {
                    "status" : False,
                    "description" : "unknown error adding/updating vehicleTypes info"
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

@app.route('/deletevehicletype', methods=['POST', 'GET'])
def deletevehicletype():
    # http://127.0.0.1:53000/deletevehicletype
    print("inside 2 deletevehicletype")
    data = request.get_json()
    print("deletevehicletype input : " + json.dumps(data))
    print("deletevehicletype input id: " + str(data['id']))
    try:
        VehicleType.query.filter_by(id=data['id']).delete()
        db.session.commit()
    except Exception: 
        print("No VehicleType record in DB")
        pass
        print("Other exception")
        response = {
            "status" : False,
            "description" : "unknown error deleting VehicleType info"
        }
        return app.response_class(json.dumps(response), content_type='application/json') 

    finally:
        print("Deleted the VehicleType data from DB")

    response = (
        {
            "status": True,
            "description": "Deleted the vehicleTypes data from DB"
        }
    )

    return app.response_class(json.dumps(response), content_type='application/json')

