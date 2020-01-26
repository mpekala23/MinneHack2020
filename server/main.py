from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from storage import Users, Bills, Comments, Subscriptions, Votes

app = Flask(__name__)
CORS(app)

@app.route('/')
def homepage():
    return render_template('test.html')

@app.route('/insert_user', methods=['POST'])
def insert_user():
    try:
        username = request.form.get('username')
        password = request.form.get('password')
        return str(Users.insert_user(username, password))
    except Exception as e:
        return str(e)

@app.route('/check_user', methods=['GET'])
def check_user():
    try:
        username = request.args.get('username')
        password = request.args.get('password')
        return jsonify({'status': Users.check_user(username, password)})
    except Exception as e:
        return jsonify({'status': False})

@app.route('/delete_user', methods=['POST'])
def delete_user():
    try:
        username = request.form.get('username')
        password = request.form.get('password')
        if not Users.check_user(username, password):
            return str(False)
        return str(Users.delete_user(username))
    except Exception as e:
        return str(e)

@app.route('/insert_bill', methods=['POST'])
def insert_bill():
    try:
        data = {
            'id': request.form['bill_status'],
            'body': request.form['body'],
            'author': request.form['author'],
            'last_action': request.form['last_action'],
            'summary': request.form['summary'],
            'topic': request.form['topic'],
        }
        return str(Bills.insert_bill(data))
    except Exception as e:
        return str(e)

@app.route('/get_bills', methods=['GET'])
def get_bills():
    try:
        return jsonify({
            'bills': Bills.get_all_bills(),
        })
    except Exception as e:
        return str(e)

@app.route('/delete_bill', methods=['POST'])
def delete_bill():
    try:
        id = request.form['id']
        return str(Bills.delete_bill(id))
    except Exception as e:
        return str(e)

@app.route('/insert_subscription', methods=['POST'])
def insert_subscription():
    try:
        data = {
            'username': request.form['username'],
            'topic':request.form['topic'],
        }
        return str(Subscriptions.insert_subscription(data))
    except Exception as e:
        return str(e)

@app.route('/get_subscriptions', methods=['GET'])
def get_subscriptions():
    try:
        username = request.args['username']
        my_subs = Subscriptions.get_subscriptions(username)
        options = Bills.get_all_topics()
        return jsonify({
            'my_subscriptions': my_subs,
            'options': options,
        })
    except Exception as e:
        return str(e)

@app.route('/delete_subscription', methods=['POST'])
def delete_subscription():
    try:
        data = {
            'username': request.form['username'],
            'topic':request.form['topic'],
        }
        return str(Subscriptions.delete_subscription(data))
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run(debug=True)
