__author__ = 'dalia'
"""
models.py - define the database model that are used in the app
"""

from flask.ext.sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#Table reports maps to this class
class Worker(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    age = db.Column(db.Integer)
    type = db.Column(db.String(50))
