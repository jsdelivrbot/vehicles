from application import generate_application, MIGRATE
from flask_migrate import MigrateCommand
from flask_script import Manager


MANAGER = Manager(generate_application())
MANAGER.add_option("-c", "--config", dest="config_module", required=False)
MANAGER.add_command('db', MigrateCommand)
MANAGER.run()
