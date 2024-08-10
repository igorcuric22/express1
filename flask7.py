from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index1.html')

@app.route('/api/get', methods=['GET'])
def get_data():
    print('----------------------------------------------------')
    data = [{"id": 1, "name": "t64"},
            {"id": 2, "name": "t62"}]
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='192.168.1.114', port=4000)