
from sqlalchemy.schema import UniqueConstraint
from sqlalchemy import Table, Column, Integer, String, VARCHAR, LargeBinary, UnicodeText

from vehicles.extensions import DB


class Location(DB.Model):

    __tablename__ = "locations"

    id = DB.Column(DB.Integer, primary_key=True)
    location = DB.Column(DB.String(128), nullable=False, unique=True) # Round Rock, North Austin,etc

    def __init__(self, location):
            self.location = location


class ServiceType(DB.Model):

    __tablename__ = "service_types"

    id = DB.Column(DB.Integer, primary_key=True)
    name = DB.Column(DB.String(128), nullable=False, unique=True) # computer friendly: mini, full_interior, full_detail, full_detail_w_compound
    display_name = DB.Column(DB.String(128), nullable=False) # Mini, Full Interior, etc
    description = DB.Column(DB.Text(), nullable=False) # example for mini: "Wash with vacuum, windows inside and out, tire shine, ..."
    available_services_ref = DB.relationship('AvailableService', backref='ServiceType', lazy='joined')

    def __init__(self, name, display_name, description):
        self.name = name
        self.display_name = display_name
        self.description = description


class SpecialService(DB.Model):

    __tablename__ = "special_services"

    id = DB.Column(DB.Integer, primary_key=True)
    vehicle_type_id = DB.Column(DB.Integer, DB.ForeignKey('vehicle_types.id'))  # foreign key to vehicle type
    # $20 for mini on a car, $40 for full interior on truck, etc
    name = DB.Column(DB.String(128), nullable=False)
    question = DB.Column(DB.String(128), nullable=False)
    price = DB.Column(DB.Float, nullable=False)

    __table_args__ = (
        UniqueConstraint("vehicle_type_id", "name", name="uk_special_services"),
    )

    def __init__(self, vehicle_type_id, name, question, price):
        self.vehicle_type_id = vehicle_type_id
        self.name = name
        self.question = question
        self.price = price


class VehicleCondition(DB.Model):

    __tablename__ = "vehicle_conditions"

    id = DB.Column(DB.Integer, primary_key=True)
    condition = DB.Column(DB.String(128), nullable=False, unique=True) # excellent, good, fair, dirty, etc...

    def __init__(self, condition):
        self.condition = condition


class VehicleType(DB.Model):

    __tablename__ = "vehicle_types"

    id = DB.Column(DB.Integer, primary_key=True)
    # car, crossover, truck, suv, etc
    type = DB.Column(DB.String(128), nullable=False, unique=True)
    # Car, Crossover (small SUV), Truck, SUV, etc
    display_text = DB.Column(DB.String(128), nullable=False)
    available_servicesref = DB.relationship('AvailableService', backref='VehicleType', lazy='joined')

    def __init__(self, type, display_text):
        self.type = type
        self.display_text = display_text


class AvailableService(DB.Model):

    __tablename__ = "available_services"

    # """ vehicle type and service type are composite primary key """
    id = DB.Column(DB.Integer, primary_key=True)
    vehicle_type_id = DB.Column(DB.Integer, DB.ForeignKey('vehicle_types.id'))  # foreign key to vehicle type
    service_type_id = DB.Column(DB.Integer, DB.ForeignKey('service_types.id'))  # foreign key to service type
    vehicle_condition_id = DB.Column(DB.Integer, DB.ForeignKey('vehicle_conditions.id'))

    # $20 for mini on a car, $40 for full interior on truck, etc
    base_price = DB.Column(DB.Float, nullable=True)

    __table_args__ = (
        UniqueConstraint("vehicle_type_id", "service_type_id", "vehicle_condition_id", name="uk_available_services"),
    )

    def __init__(self, vehicle_type_id, service_type_id, vehicle_condition_id, base_price):
        self.vehicle_type_id = vehicle_type_id
        self.service_type_id = service_type_id
        self.vehicle_condition_id = vehicle_condition_id
        self.base_price = base_price


class ZipCode(DB.Model):

    __tablename__ = "zip_code"

    id = DB.Column(DB.Integer, primary_key=True)
    zip_code = DB.Column(DB.String(128), nullable=False, unique=True)
    price_increase = DB.Column(DB.Integer, nullable=True) # a percentage increase to the price. integer field should be fine here

    def __init__(self,zip_code,price_increase):
        self.zip_code = zip_code
        self.price_increase = price_increase
