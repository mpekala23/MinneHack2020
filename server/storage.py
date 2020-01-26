from flask_pymongo import MongoClient
import bcrypt

client = MongoClient("mongodb+srv://client:client@minnehack2020-dvyxh.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = client["hot_bills"]

"""
username: '',
hash: bytes,
"""
class Users_:
    def __init__(self, db):
        self._Users = db.users
        self._salt = bcrypt.gensalt()

    # attempts to insert user, returns username on success and False on failure
    def insert_user(self, username, password):
        if (self._Users.find_one({'username': username})):
            return False
        hash = bcrypt.hashpw(password.encode('utf-8'), self._salt)
        self._Users.insert_one({
            'username': username,
            'hash': hash,
        })
        return username

    # returns true if a user exists with given credentials
    def check_user(self, username, password):
        User = self._Users.find_one({'username': username})
        if not User:
            return False
        return bcrypt.checkpw(password.encode('utf-8'),User['hash'])

    def delete_user(self, username):
        self._Users.delete_one({'username': username})
        return username

"""
id: '', UNIQUE KEY
body: 'house' || 'senate',
author: '',
last_action: '',
summary: '',
topic: '',
"""
class Bills_:
    def __init__(self, db):
        self._Bills = db.bills

    def insert_bill(self, data):
        if (self._Bills.find_one({'id':data['id']})):
            return False
        self._Bills.insert_one(data)
        return data['id']

    def delete_bill(self, id):
        if (not self._Bills.find_one({'id':data['id']})):
            return False
        self._Bills.delete_one({'id': id})
        return id

    def bill_to_dict(self, item):
        return {
            'body': item['body'],
            'id': item['id'],
            'last_action': item['last_action'],
            'author': item['author'],
            'summary': item['summary'],
            'topic': item['topic'],
        }

    def get_all_bills(self):
        result = []
        cursor = self._Bills.find({})
        for item in cursor:
            result.append(self.bill_to_dict(item))
        return result

    def get_all_topics(self):
        result = []
        cursor = self._Bills.find({}).distinct('topic')
        for item in cursor:
            result.append(item)
        return result

    def get_user_bills(self, username, topics):
        result = []
        for topic in topics:
            cursor = self._Bills.find({'topic': topic})
            for item in cursor:
                result.append(self.bill_to_dict(item))
        return result

"""
username: '',
topic: '',
"""
class Subscriptions_:
    def __init__(self, db):
        self._Subscriptions = db.subscriptions

    def insert_subscription(self, data):
        if (self._Subscriptions.find_one(data)):
            return False
        self._Subscriptions.insert_one(data)
        return data

    def delete_subscription(self, data):
        if (not self._Subscriptions.find_one(data)):
            return False
        self._Subscriptions.delete_one(data)
        return data

    def sub_to_dict(self, item):
        return {
            'username': item['username'],
            'topic': item['topic'],
        }

    def get_subscriptions(self, username):
        result = []
        cursor = self._Subscriptions.find({'username':username})
        for item in cursor:
            result.append(item['topic'])
        return result

"""
id: # >= 0, DO NOT PASS, WILL BE GENERATED
username: '',
text: '',
subcomments: [],
bill: (bill_id),
parent: -1/non-existent OR (comment_id)
"""
class Comments_:
    def __init__(self, db):
        self._Comments = db.comments
        self._nextId = 0

    def insert_comment(self, data):
        if (self._Comments.find_one(data)):
            return False
        data['id'] = self._nextId
        self._nextId += 1
        self._Subscriptions.insert_one(data)
        return self._nextId - 1

    def delete_comment(self, id):
        if (not self._Comments.find_one(id)):
            return False
        self._Subscriptions.delete_one({'id': id})
        return id

"""
value: +/-1,
username: '',
bill: (bill_id),
"""
class Votes_:
    def __init__(self, db):
        self._Votes = db.votes

    def insert_vote(self, data):
        Vote = self._Votes.find_one(data)
        if (Vote):
            if (Vote["value"] == data["value"]):
                return self.delete_vote({
                    'username': data['username'],
                    'bill': data['bill'],
                })
            else:
                self._Votes.update_one(data,
                    {'$set':{'value':data['value']}},
                    upsert=False)
                return data
        self._Votes.insert_one(data)
        return data

    def delete_vote(self, data):
        if (self._Votes.find_one(data)):
            return False
        self._Votes.delete_one(data)
        return data

Users = Users_(db)
Bills = Bills_(db)
Subscriptions = Subscriptions_(db)
Comments = Comments_(db)
Votes = Votes_(db)
