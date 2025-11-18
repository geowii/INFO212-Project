from flask import Flask, request, jsonify
from flask_cors import CORS
import connect_test as c

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()
    print('----------TEST---------')
    return jsonify({'result': f"Received: {data['message']}"})

@app.route('/insert', methods=['POST'])
def insert():
    json_data = request.get_json()
    mode = json_data[0]
    data = [tuple(json_data[1])]
    sql_result = c.insert(data, mode)
    return jsonify({'result': f"Inserted successfully: {sql_result}"})

@app.route('/delete', methods=['POST'])
def delete():
    json_data = request.get_json()
    mode = json_data[0]
    id_no = json_data[1]
    sql_result = c.delete(id_no, mode)
    return jsonify({'result': f"Successfully deleted: {sql_result}"})

@app.route('/get', methods=['POST'])
def get():
    json_data = request.get_json()
    mode = json_data[0]
    data = tuple(json_data[1])
    sql_result = c.get(data, mode)
    return jsonify({'result': sql_result})

@app.route('/getAllCorI', methods=['POST'])
def getAllCorI():
    json_data = request.get_json()
    mode = json_data[0]
    id_no = json_data[1]
    sql_result = c.getAllCorI(id_no, mode)
    return jsonify({'result': sql_result})

@app.route('/getAll', methods=['GET'])
def getAll():
    mode = request.args.get('mode')
    sql_result = c.getAll(mode)
    return jsonify({'result': f"Successfully recieved from {mode}: {sql_result}"})

@app.route('/update', methods=['POST'])
def update():
    json_data = request.get_json()
    mode = json_data[0]
    id_no = json_data[1]
    data = [tuple(json_data[2])]
    sql_result = c.update(data, id_no, mode)
    return jsonify({'result': f"Successfully updated: {sql_result}"})

@app.route('/delAll', methods=['GET'])
def delAll():
    mode = request.args.get('mode')
    sql_result = c.delAll(mode)
    return jsonify({'result': f"Deleted from {mode}: {sql_result}"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)