from flask import render_template, request, flash, redirect, url_for
from __init__ import app, db
from __init__ import exc
import sys
from models.location import Location
import json

@app.route('/addlocation', methods=['POST', 'GET'])
def addlocation():
    # http://127.0.0.1:53000/addlocation
    print("inside addlocation")
    data = request.get_json() or request.form
    print("response : "+ json.dumps(data))
    print("response addlocation: "+ data['location'])
    locationtype = Location(location=data['location'])
    db.session.add(locationtype)
    db.session.commit()
    flash('New entry was successfully posted')
    response2 = (
        {
            "status": True,
            "description": "New entry was successfully posted"
        }
    )  
 
    return app.response_class(json.dumps(response2), content_type='application/json')
  
   
@app.route('/listlocationtype', methods=['POST', 'GET'])
def listlocationtype():
    # http://127.0.0.1:53000/listservicetypes
    print("inside listlocationtype")
    location_list = []

    locationtype = db.session.query(Location)
    for llocationtype in locationtype:
        location_list.append({
            "id":llocationtype.id,
            "location":llocationtype.location
            })     
 
    return app.response_class(json.dumps(location_list), content_type='application/json')
  
    # return render_template('add.html')


  # view for editing location types
@app.route('/editlocation', methods=['POST', 'GET'])
def editlocation():
    # http://127.0.0.1:53000/editlocation
    print("inside 2 editlocation")
    data = request.get_json()
    print("editlocation input : " + json.dumps(data))
    print("editlocation input locationId: " + str(data['location']))
    recexists = 0
    db_last_apicall_date = ""

    l_location = db.session.query(Location).filter_by(id=data['id'])

    response2 = ""

    if (data['id']):
        try:
            record = l_location.one()
            recexists = 1            
        except Exception: 
            print("No Location record in DB")
            pass
        finally:
            print("Location data exists in DB")

    if ( recexists == 1):
        print("existing Location data")
        print("id:"+str(record.id))
        print("cation:"+str(record.location))
        

    if ( recexists == 1) and (l_location.count() > 0):
        print("trying to update new values")
        record.location = data['location']

    if ( recexists == 0):
        temp_location = Location(location=data['location'])
        db.session.add(temp_location)      

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
                    "description" : "IntegrityError error, Location already exists"
                }
            return  app.response_class(json.dumps(response), content_type='application/json')
        else:
            print("Other exception")
            response = {
                    "status" : False,
                    "description" : "unknown error adding/updating Location info"
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

@app.route('/deletelocation', methods=['POST', 'GET'])
def deletelocation():
    # http://127.0.0.1:53000/deletelocation
    print("inside 2 deletevehiclecondition")
    data = request.get_json()
    print("deletelocation input : " + json.dumps(data))
    print("deletelocation input id: " + str(data['id']))
    try:
        Location.query.filter_by(id=data['id']).delete()
        db.session.commit()
    except Exception: 
        print("No Location record in DB")
        pass
        print("Other exception")
        response = {
            "status" : False,
            "description" : "unknown error deleting Location info"
        }
        return app.response_class(json.dumps(response), content_type='application/json') 

    finally:
        print("Deleted the Location data from DB")

    response = (
        {
            "status": True,
            "description": "Deleted the Location data from DB"
        }
    )

    return app.response_class(json.dumps(response), content_type='application/json')


