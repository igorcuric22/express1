from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('popx6.html')

@app.route('/api/get', methods=['GET'])
def get_data():
    print('GET request triggered on /api/data')
    data = [{id:1,"name": "success1"},
            {id:2,"name": "success2"}]
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='192.168.1.114', port=4000)