__author__ = 'dalia'

from setuptools import setup
import os

name = "server"
version = "0.1"


def read(*rnames):
    return open(os.path.join(os.path.dirname(__file__), *rnames)).read()


setup(
    name=name,
    version=version,
    description="Flask boiler plate backend with Angular front end",
    long_description=read('README'),
    #Please update your name here
    author="Dalia Banerjee",
    author_email='dalia.ban@gmail.com',
    url='',
    license='',
    include_package_data=True,
    packages=['server'],
    zip_safe=False,
    # Note: the following list is processed in reverse order !!!!
    install_requires=[
        'Flask-SQLAlchemy==1.0',
        'Flask-Restless==0.13.1',
        'Flask==0.10.1',
        'Flask-Cors==2.1.2',
        'Werkzeug==0.11.10',
        'Jinja2==2.8',
        'psycopg2==2.6.1',
        'PasteScript==2.0.2',
        'PasteDeploy==1.5.0',
        'Paste==2.0.3'
    ],
    entry_points="""
    [paste.paster_command]
    create_db = server.command:DBCommand
    [paste.app_factory]
    main = server.app:make_app
    debug = server.app:make_debug
    """,
)

