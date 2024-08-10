from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    print('GET request triggered on /api/data')
    data = [{"message": "Hello from Flask!", "status": "success"},
            {"message": "Hello from Flask!", "status": "success"}]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
