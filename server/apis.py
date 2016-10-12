__author__ = 'dalia'

"""
apis.py sets up the restful interface with the existing models
"""

import flask
from flask.ext.restless import APIManager
from models import *

def create_api(app):
    manager = APIManager(app, flask_sqlalchemy_db=db)

    manager.create_api(Worker, methods=['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
                       results_per_page=None,
                       url_prefix='/server/api')
