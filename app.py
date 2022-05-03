from pymongo import MongoClient
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

client = MongoClient('localhost', 27017)

db = client.dbsparta


@app.route('/')
def home():
	return render_template('insta.html')


@app.route("/mars", methods=["POST"])
def web_mars_post():
	return jsonify({'msg': 'post 연결 완료'})


if __name__ == '__main__':
	app.run('0.0.0.0', port=5000, debug=True)
