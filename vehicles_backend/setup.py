
import os
if os.getenv('VBOX_MOUNTED'):
    del os.link

from setuptools import setup
from setuptools import find_packages

with open('README.md', 'r') as readmefile:
    README = readmefile.read()


setup(
    name='vehicle_detailing_manager',
    version='0.1.0',
    url='git@github.com:chamarthiraji/vehicles.git',
    description='For mobile detail business',
    long_description=README,
    packages=find_packages(exclude=['tests', 'build', 'dist', 'docs']),
    install_requires=[
        'boto',
        'configparser',
        'flask',
        'flask_restless',
        'flask-cors',
        'Flask-Migrate',
        'Flask-SQLAlchemy',
        'gcs-oauth2-boto-plugin',
        'google-api-python-client',
        'GoogleAppEngineCloudStorageClient',
        'httplib2',
        'lib',
        'mom',
        'oauth2client',
        'PyMySQL',
        'pyOpenSSL',
        'requests',
        'retry_decorator',
        'six',
        'SocksiPy-branch',
        'suds-jurko',
    ],
    entry_points={
        'console_scripts': [
            'vehicles-run = vehicles.cmd.run:main',
            'vehicles-run-test = vehicles.cmd.run:main_test',
        ],
    },
    include_package_data=True,
    zip_safe=False,
)
