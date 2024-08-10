from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/hello/<name>')
def hello(name):
    return f"Hello, {name}!"


if __name__ == '__main__':
    app.run(debug=True)
