from flask import Flask, render_template, request, flash

app = Flask(__name__)
app.config['DEBUG'] = True
app.secret_key = 'some secret key'

@app.route('/dream', methods=['GET'])
def home():
    return render_template('index.html')
