from flask import Flask
from storage import Users

app = Flask(__name__)

@app.route('/')
def homepage():
    return "home"

@app.route('/add_user/<string:username>/<string:password>')
def add_user(username, password):
    if (Users.insert_user(username,password)):
        return "Success, user added"
    else:
        return "Failure, user not added"

@app.route('/check_user/<string:username>/<string:password>')
def check_user(username, password):
    return str(Users.check_user(username, password))

app.run(debug=True)
