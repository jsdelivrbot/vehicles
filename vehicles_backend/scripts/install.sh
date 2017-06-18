#!/bin/bash

rmvirtualenv vehicles
mkvirtualenv vehicles
python setup.py develop
pip install -r requirements.txt

vehicles-run
