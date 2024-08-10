from flask import Flask, jsonify,request, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('popx6.html')


@app.route('/api/data', methods=['GET'])
def get_data():
    # You can add logic to fetch or generate the data here
    data = {"message": "Hello from Flask!", "status": "success"}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
