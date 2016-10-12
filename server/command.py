__author__ = 'dalia'
from paste.script.command import Command
import ConfigParser
from models import db
import os


class DBCommand(Command):
    # Parser configuration
    summary = "Database Command"
    usage = "ini_file_name command"
    group_name = "server"
    parser = Command.standard_parser(verbose=False)

    def command(self):
        os.environ['NLS_LANG'] = ".UTF8"
        if len(self.args) != 2:
            print "configuration file is needed and action is needed"
        config = ConfigParser.RawConfigParser()
        config.read(self.args[0])
        local_conf = config.items("app:main")
        import flask
        app = flask.Flask(__name__)
        for k in local_conf:
            if k[0].startswith("flask"):
                flask_key = k[0].replace("flask.", "")
                app.config[flask_key.upper()] = k[1]
        db.init_app(app)
        if self.args[1] == "createall":
            with app.app_context():
                db.create_all()
        elif self.args[1] == "dropall":
            user_var = raw_input(
                "Are you sure that you want to drop the database? (N [y/n])")
            if user_var.lower() == "y":
                with app.app_context():
                    db.drop_all()
        else:
            print "Unknown command"

if __name__ == "__main__":
    import sys
    command = DBCommand("DB")
    command.args = sys.argv[1:]
    command.command()
