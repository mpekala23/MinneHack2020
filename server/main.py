from flask import Flask
from flask_pymongo import PyMongo, MongoClient
from pprint import pprint

app = Flask(__name__)
client = MongoClient("mongodb+srv://client:client@minnehack2020-dvyxh.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = client["sample_mflix"]

@app.route('/')
def homepage():
    cursor = db.comments.find({})
    for item in cursor:
        print(item)
    return str(db.comments.find({}))

app.run(debug=True)
