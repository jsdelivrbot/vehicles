from flask import render_template, request, flash, redirect, url_for
from __init__ import app, db
from __init__ import exc
import sys
from models.zipcode import ZipCode
import json

@app.route('/addzipcode', methods=['POST', 'GET'])
def addzipcode():
    # http://127.0.0.1:53000/addzipcode
    print("inside addzipcode")
    data = request.get_json() or request.form
    print("request : "+ json.dumps(data))
    print("request addzipcode: "+ data['zipcode'])
    tmp_price_inc = int(data['priceIncrease'])
    print("tmp_price_inc: "+data['priceIncrease'])
    zipcode = ZipCode(zip_code=data['zipcode'],
        price_increase=tmp_price_inc)
    db.session.add(zipcode)
    db.session.commit()
    flash('New entry was successfully posted')
    response2 = (
        {
            "status": True,
            "description": "New entry was successfully posted"
        }
    )  
 
    return app.response_class(json.dumps(response2), content_type='application/json')
  
   
@app.route('/listzipcode', methods=['POST', 'GET'])
def listzipcode():
    # http://127.0.0.1:53000/listzipcode
    print("inside listzipcode")
    zipcode_list = []

    zipcode = db.session.query(ZipCode)
    for lzipCode in zipcode:
        zipcode_list.append({
            "id":lzipCode.id,
            "zip_code":lzipCode.zip_code,
            "price_increase":lzipCode.price_increase
            })     
 
    return app.response_class(json.dumps(zipcode_list), content_type='application/json')
  
# Updating Zipcode  
@app.route('/updatezipcode', methods=['POST', 'GET'])
def updatezipcode():
    # http://127.0.0.1:53000/addzipcode
    print("inside addzipcode")
    data = request.get_json() or request.form
    print("request : "+ json.dumps(data))
    print("request addzipcode: "+ data['zipcode'])
    tmp_price_inc = int(data['priceIncrease'])
    print("tmp_price_inc: "+data['priceIncrease'])
    zipcode = ZipCode(zip_code=data['zipcode'],
        price_increase=tmp_price_inc)
    db.session.add(zipcode)
    db.session.commit()
    flash('New entry was successfully posted')
    response2 = (
        {
            "status": True,
            "description": "New entry was successfully posted"
        }
    )  
 
    return app.response_class(json.dumps(response2), content_type='application/json')

# view for editing service types
@app.route('/editzipcode', methods=['POST', 'GET'])
def editzipcode():
    # http://127.0.0.1:53000/editzipcode
    print("inside 2 editzipcode")
    data = request.get_json()
    print("editzipcode input : " + json.dumps(data))
    print("editzipcode input serviceTypeId: " + str(data['zipcode']))
    recexists = 0
    l_zipcode = db.session.query(ZipCode).filter_by(id=data['id'])

    response2 = ""

    if (data['id']):
        try:
            record = l_zipcode.one()
            recexists = 1
        except Exception as err: 
            print("No Zipcode record in DB" + str(err))
            pass
        finally:
            print("zipcode data exists in DB")

    if ( recexists == 1):
        print("existing zipcode data")
        print("id:"+str(record.id))
        print("zip_code:"+str(record.zip_code))
        print("price_increase:"+str(record.price_increase))
        

    if ( recexists == 1) and (l_zipcode.count() > 0):
        print("trying to update new values")
        record.zip_code = data['zipcode']
        record.price_increase = data['priceIncrease']

    if ( recexists == 0):

        zipcode = ZipCode(zip_code=data['zipcode'],
                            price_increase=data['priceIncrease'])
        db.session.add(zipcode)     

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
                    "description" : "IntegrityError error,zipcode already exists"
                }
            return  app.response_class(json.dumps(response), content_type='application/json')
        else:
            print("Other exception")
            response = {
                    "status" : False,
                    "description" : "unknown error adding/updating zipcode info"
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

@app.route('/deleteZipcode', methods=['POST', 'GET'])
def deleteZipcode():
    # http://127.0.0.1:53000/deleteZipcode
    print("inside 2 deleteZipcode")
    data = request.get_json()
    print("deleteZipcode input : " + json.dumps(data))
    print("deleteZipcode input id: " + str(data['id']))
    try:
        ZipCode.query.filter_by(id=data['id']).delete()
        db.session.commit()
    except Exception: 
        print("No Zipcode record in DB")
        pass
        print("Other exception")
        response = {
            "status" : False,
            "description" : "unknown error deleting zipcode info"
        }
        return app.response_class(json.dumps(response), content_type='application/json') 

    finally:
        print("Deleted the zipcode data from DB")

    response = (
        {
            "status": True,
            "description": "Deleted the zipcode data from DB"
        }
    )

    return app.response_class(json.dumps(response), content_type='application/json')


