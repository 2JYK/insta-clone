from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)

db = client.dbsparta


@app.route('/')
def home():
	return render_template('index.html')


# user ###########################################

@app.route("/mars", methods=["POST"])
def user_info(): # 회원정보 입력(회원가입 -> 이름 아이디어좀 ㅎ)
	# 아무리 생각해도 여기에 유저 아이디 있는게
	insta_id_receive = request.form['insta_id_give']
	name_receive = request.form['name_give']
	phone_num_receive = request.form['phone_num_give']
	email_receive = request.form['email_give']
	password_receive = request.form['password_give']

	doc = { # db에 입력되는 user의 정보
		'insta_id': insta_id_receive,
		'name': name_receive,
		'phone_num': phone_num_receive,
		'email': email_receive,
		'password': password_receive
	}

	db.user_info.insert_one(doc)
	return jsonify({'msg': '회원가입 완료!'})


# profile ###########################################


@app.route("/mars", methods=["POST"])
def profile_info(): # 프로필 정보
	pf_img_receive = request.form['pf_img_give']

	doc = { # db에 입력되는 user의 정보
		'pf_img': pf_img_receive
	}

	db.profile_info.insert_one(doc)
	return jsonify({'msg': '프로필 작성 완료!'}) # 굳이 필요한가?


@app.route("/mars", methods=["GET"]) # user_info + post + 프로필사진!!!!!!!!!!!!!!!
def prof_output():  # 회원정보에서 아이디와 이름을 받아오고, 이름을 프로필에 보여줌(아이디는 신원 확인용)
	user_info_list = list(db.userinfo.find({'insta_id, name'}, {'phone_num', 'email', 'password'}))
	post_list = list(db.postinfo.find({'post_id'}, {'location', 'photo', 'heart_cnt', 'post_desc', 'post_data'}))
	prof_list = list(db.profileinfo.find({}, {'_id': False}))
	# follow, following 에서도 숫자 받아와야지 len
	return jsonify({'prof_name': user_info_list, 'post_cnt': len(post_list), 'profile_img': prof_list})


# post ###########################################


@app.route("/mars", methods=["POST"])
def post_info(): # 포스팅 정보 입력
	location_receive = request.form['location_give']
	photo_receive = request.form['photo_give']
	post_desc_receive = request.form['post_desc_give']
	post_date_receive = request.form['post_date_give']
	heart_cnt_receive = request.form['heart_cnt_give'] # 리스트로 만들고 싶음/ 하나의 게시글에 여러 개의 하트가 달리니까

	doc = { # db에 입력되는 user의 정보
		'location': location_receive,
		'photo': photo_receive,
		'post_desc': post_desc_receive,
		'post_date': post_date_receive,
		'heart_cnt': heart_cnt_receive
	}

	db.post_info.insert_one(doc)

	return jsonify({'msg': '포스팅 완료!'})


@app.route("/mars", methods=["GET"]) # 게시글에 들어가는 회원 아이디, 게시글꺼 다 받아와서 쏴주세요~
def post_output():  # 회원정보에서 아이디와 이름을 받아오고, 이름을 프로필에 보여줌(아이디는 신원 확인용)
	user_info_list = list(db.userinfo.find({'name'}, {'phone_num', 'email', 'password'}))
	post_info_list = list(db.postinfo.find({}, {'_id': False}))
	return jsonify({'post_name': user_info_list, 'post_info': post_info_list})


# comment ###########################################


@app.route("/mars", methods=["POST"])
def comment_info(): # 포스팅 정보 입력
	cm_writer_receive = request.form['cm_writer']
	cm_receive = request.form['cm_give']
	cm_date_receive = request.form['cm_date_give']
	cm_heart_receive = request.form['cm_haert_give'] # 리스트로 만들고 싶음/ 하나의 게시글에 여러 개의 하트가 달리니까

	doc = { # db에 입력되는 user의 정보
		'cm_writer': cm_writer_receive,
		'cm': cm_receive,
		'cm_date': cm_date_receive,
		'cm_heart': cm_heart_receive,
	}

	db.comment_info.insert_one(doc)

	return jsonify({'msg': '댓글작성 완료!'})


@app.route("/mars", methods=["GET"])
def comment_output():  # post의 id를 가져와 어떤 게시글인지 확인하고, 그곳에 대한 댓글을 사용자에게 제시해줌s
	post_info_list = list(db.postinfo.find({}, {'location', 'photo', 'heart_cnt', 'post_desc', 'post_date'}))
	return jsonify({'post_info': post_info_list})


# following & follower ###########################################


@app.route("/mars", methods=["POST"])
def following_info(): # 팔로잉 정보 입력
	from_user_id_receive = request.form['from_user_id']
	to_user_id_receive = request.form['to_user_id']

	doc = { # db에 입력되는 user의 정보
		'from_user_id': from_user_id_receive,
		'to_user_id': to_user_id_receive,
	}

	db.following_info.insert_one(doc)
	return jsonify({'msg': '댓글작성 완료!'})


@app.route("/mars", methods=["POST"])
def follower_info(): # 팔로잉 정보 입력
	from_user_id_receive = request.form['from_user_id']
	to_user_id_receive = request.form['to_user_id']

	doc = { # db에 입력되는 user의 정보
		'from_user_id': from_user_id_receive,
		'to_user_id': to_user_id_receive,
	}

	db.follower_info.insert_one(doc)
	return jsonify({'msg': '댓글작성 완료!'})


if __name__ == '__main__':
	app.run('0.0.0.0', port=5000, debug=True)
