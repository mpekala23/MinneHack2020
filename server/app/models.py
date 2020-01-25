from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, index=True, unique=True)
    series = db.Column(db.String)
    author = db.Column(db.String)
    date = db.Column(db.Date)
    image1 = db.Column(db.LargeBinary)
    caption1 = db.Column(db.String)
    credit1 = db.Column(db.String)
    image2 = db.Column(db.LargeBinary)
    caption2 = db.Column(db.String)
    credit2 = db.Column(db.String)
    image3 = db.Column(db.LargeBinary)
    caption3 = db.Column(db.String)
    credit3 = db.Column(db.String)
    content = db.Column(db.String)
