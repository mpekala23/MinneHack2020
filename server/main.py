from flask import Flask, request, render_template
from storage import Users, Bills, Comments, Subscriptions, Votes

app = Flask(__name__)

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
            id: request.form['bill_status'],
            body: request.form['body'],
            author: request.form['author'],
            last_action: request.form['last_action'],
            summary: request.form['summary'],
            topic: request.form['topic'],
        }
        return str(Bills.insert_bill(data))
    except Exception as e:
        return str(e)

@app.route('/delete_bill', methods=['POST'])
def delete_bill():
    try:
        id = request.form['id']
        return str(Bills.delete_bill(id))
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run(debug=True)
