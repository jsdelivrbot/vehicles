from flask import render_template, request, flash, redirect, url_for
from __init__ import app, db
from __init__ import exc
import sys

from models.specialServices import SpecialServices
import json


@app.route('/listspecialservices', methods=['POST', 'GET'])
def listspecialservices():
# http://127.0.0.1:53000/listspecialservices
  print("inside listspecialservices");

  special_services_list = db.session.query(SpecialServices)

  temp_list = []
  for temp_special_service_list in special_services_list:
    temp_list.append({
      "id": temp_special_service_list.id,
      "vehicle_type_id": temp_special_service_list.vehicle_type_id,
      "name": temp_special_service_list.name,
      "question": temp_special_service_list.question,
      "price": temp_special_service_list.price
    })

    print("id" + str(temp_special_service_list.id))
    print("vehicle_type_id" + str(temp_special_service_list.vehicle_type_id))
    print("price" + str(temp_special_service_list.price))
    print("question" + str(temp_special_service_list.question))
    print("name" + str(temp_special_service_list.name))
    print("----------------------")

  return app.response_class(json.dumps(temp_list), content_type='application/json')


@app.route('/deletespecialservices', methods=['POST', 'GET'])
def deletespecialservices():
  # http://127.0.0.1:53000/deletespecialservices
  print("inside deletespecialservices")
  data = request.get_json()
  print("deletespecialservices input : " + json.dumps(data))
  
  try:
    SpecialServices.query.filter_by(id=data['id']).delete()
    db.session.commit()
  except Exception:
    print(" No SpecialServices record in DB ")
    pass
    print("Other EXception")
    response = {
      "status": False,
      "description": "unkown error deleting Special services"
    }
    return app.response_class(json.dumps(response), content_type='application/json')

  finally:
    print("Deleted the Special Services data from DB")

    response = ({
      "status": True,
      "description": "Deleted the Special Services data from DB"

    })

  return app.response_class(json.dumps(response), content_type='application/json')

@app.route('/editspecialservices', methods=['POST', 'GET'])
def editspecialservices():
  # http://127.0.0.1:53000/editspecialservices
  print("inside  editspecialservices")
  data = request.get_json()
  print("editspecialservices input : "+ json.dumps(data))
  print("editspecialservices input vehicleTypeId: " + str(data['vehicleTypeId']))

  recexists = 0
  db_last_apicall_date = ""
  l_special_service = db.session.query(SpecialServices).filter_by(id=data['ssId'])

  response2 = ""
  try:
    record = l_special_service.one()
    recexists = 1
  except Exception:
    print("No Special Services record in DB")  
    pass
  finally:
    print("specialservices data exists in DB")

  if( recexists == 1):
    print("existing specialservices data")
    print("id:"+str(record.id))
    print("vehicle_type_id:"+str(record.vehicle_type_id))
    print("name:"+str(record.name))
    print("question:"+str(record.question))
    print("price:"+str(record.price))

  if ( recexists == 1) and (l_special_service.count() > 0):
    print("trying to update new values")
    record.price = data['QPrice']
    record.question = data['Question']
        
  if ( recexists == 0):

    specialservices = SpecialServices(
                                        data['vehicleTypeId'],
                                        data['QName'],
                                        data['Question'],
                                        data['QPrice'])
    db.session.add(specialservices)

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
