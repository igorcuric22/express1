from flask import Flask, jsonify, render_template
import sqlite3

app = Flask(__name__)
#pp.config['DEBUG'] = True

@app.route('/')
def home():
    return render_template('popx11.html')

@app.route('/api/get/', methods=['GET'])
def get_data():
    print('GET request triggered on /api/get')
    
    
    conn = sqlite3.connect('baza.db')
    print ("Opened database successfully")

    cursor = conn.execute("SELECT id, name from products")
    listx=[]
    for row in cursor:
        print ("ID = ", row[0])
        print ("NAME = ", row[1])
        listx.append({"id":row[0],"name":row[1]})

    
    print ("Operation done successfully")
    conn.close()

    return jsonify(listx)


# Route to fetch a specific product by ID from SQLite and return as JSON
@app.route('/api/get/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    print(f'GET request triggered on /api/get/{product_id}')
    
    conn = sqlite3.connect('baza.db')
    print("Opened database successfully")

    cursor = conn.execute("SELECT id, name FROM products WHERE id = ?", (product_id,))
    row = cursor.fetchone()
    conn.close()

    product_list = []

    if row:
        product = {"id": row[0], "name": row[1]}
        product_list.append(product)
        return jsonify(product_list)
    else:
        return jsonify({"error": "Product not found"}), 404



if __name__ == '__main__':
    app.run(host='192.168.1.114', port=4000)