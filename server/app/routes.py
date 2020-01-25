from app import app, db
from flask import jsonify, request, current_app
from app.models import User, Article
from functools import wraps
import jwt
from datetime import datetime, timedelta
from base64 import b64encode
from sqlalchemy import desc

# returns { 'token': UTF-8 encoding of token }
def generate_token(username):
    token = jwt.encode({
        'sub': username,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(minutes=30)},
        current_app.config['SECRET_KEY'])
    return { 'token': token.decode('UTF-8') }

def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        auth_headers = request.headers.get('Authorization', '').split()

        invalid = {
            'status': 'ERROR',
            'data': 'Invalid token'
        }
        expired = {
            'status': 'ERROR',
            'data': 'Expired token'
        }

        if len(auth_headers) != 2:
            return jsonify(invalid), 401

        try:
            token = auth_headers[1]
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            user = User.query.filter_by(username=data['sub']).first()
            if not user:
                raise RuntimeError('User not found')
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify(expired), 401 # 401 is Unauthorized HTTP status code
        except (jwt.InvalidTokenError, Exception) as e:
            print(e)
            return jsonify(invalid), 401

    return _verify

@app.route('/home', methods=['GET'])
def get_articles():
    return '<div>hello<div>'
