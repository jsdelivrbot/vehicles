
# import sys
# sys.path.append("vehicleapp/")
# sys.path.append("vehicleapp.othervehicles")
# sys.path.append("vehicleapp.cars")
from __init__ import db
# import db
db.create_all()
db.session.commit()
