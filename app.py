from flask import Flask, render_template, request, jsonify, redirect, url_for
from pymongo import MongoClient

import jwt, datetime, hashlib

app = Flask(__name__)

client = MongoClient('localhost', 27017)

db = client.dbsparta

SECRET_KEY = 'ABCD'

@app.route('/')
def home():
	# 현재 이용자의 컴퓨터에 저장된 cookie 에서 mytoken 을 가져 옴.
	token_receive = request.cookies.get('mytoken')
	try:
		# 암호화되어있는 token의 값을 우리가 사용할 수 있도록 디코딩(암호화 풀기)해줌
		payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
		print(payload)
		user_info = db.user_info.find_one({"insta_id": payload['id']})
		user_id = user_info['insta_id']
		user_name = user_info['name']
		return render_template('index.html', user_name=user_info["name"], user_id=user_info['insta_id'])
	# 만약 해당 token의 로그인 시간이 만료되었다면, 아래와 같은 코드를 실행.
	except jwt.ExpiredSignatureError:
		return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
	except jwt.exceptions.DecodeError:
		# 만약 해당 token이 올바르게 디코딩되지 않는다면, 아래와 같은 코드를 실행.
		return redirect(url_for("login", msg="로그인이 필요합니다."))

@app.route('/mypage')
def mypage():
	return render_template('mypage.html')

@app.route('/signup')
def signup():
	return render_template('sign-up.html')

@app.route('/login')
def login():
	print("login start")
	msg = request.args.get("msg")
	return render_template('log-in.html', msg=msg)


# ㅡㅡㅡㅡㅡ user ㅡㅡㅡㅡㅡ

@app.route("/signup", methods=["POST"])
def sign_up(): 									# 회원 가입
	global email_receive, phone_num_receive		# global > 전역변수
	email_receive = ''							# 변수를 공란으로 만들어 아래의 if문을 돌릴 때 사용
	phone_num_receive = ''

	domain_list=['naver.com','kakao.com','gmail.com','daum.net','hanmail.net']

	while True:
		contact_receive = request.form['contact_give']						#콘텍트(입력된 값) 값은 하난데, 이메일과 폰번호 중 하나로 들어가기에 밑에 if문을 사용함
		if '@' in contact_receive:											#콘텍트 값에 '@' 포함되어 있을 경우
			if contact_receive.split('@')[1] in domain_list:	#콘텍트의 도메인 값이 domain_list 에 있을 경우
				email_receive = request.form['contact_give'] 				#DB의 email_receive 값에 넣어준다.
				break														#성공시 break.
			else:															#도메인 값이 domain_list에 없는 경우
				return jsonify({'msg':'도메인을 확인해주세요'})					#해당 메세지 alert. 다시 쓸 수 있도록 유도
		elif '-' in contact_receive:													#콘텍트 값에 '-'가 포함되어 있을 경우
			if len(contact_receive.replace('-', '')) == 11:								#만약 '-'를 제외한 길이가 11 일 경우
				phone_num_receive = request.form['contact_give'].replace('-', '')		#phone_num_receive에 넣어 준다. '-'는 공란처리
				break																	#성공시 break.
			else:
				return jsonify({'msg': '이메일 또는 핸드폰번호 11자리를 입력해주세요🥰'})				#아니라면 해당 메세지 alert. 다시 쓸 수 있도록 유도

		elif '-' not in contact_receive:												#콘텍트 값에 '-'가 포함되지 않을 경우
			if len(contact_receive) == 11:												#그 값의 길이가 11 이라면
				phone_num_receive = request.form['contact_give'].replace('-', '')		#phone_num_receive에 넣어 준다. '-'는 공란처리
				break																	#성공시 break.
			else:
				return jsonify({'msg': '이메일 또는 핸드폰번호 11자리를 입력해주세요🥰'})			#아니라면 해당 메세지 alert. 다시 쓸 수 있도록 유도
		else:																			#if, elif에 해당이 되지 않는 콘텍트 값이 입력될 경우,
			return jsonify({'msg': '이메일 또는 핸드폰번호 11자리를 입력해주세요🥰'})				#해당 메세지 alert. 다시 쓸 수 있도록 유도
	name_receive = request.form['name_give']
	insta_id_receive = request.form['insta_id_give']
	password_receive = request.form['password_give']
	user_profile_receive = request.form['user_profile_give']

	password_hash_receive = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()


	doc = { 											# db에 입력되는 user의 정보
		'phone_num': phone_num_receive,
		'email': email_receive,
		'name': name_receive,
		'insta_id': insta_id_receive,
		'password': password_hash_receive,
		'user_profile': user_profile_receive
	}

	db.user_info.insert_one(doc)						# user_info 라는 db에 / 딕셔너리 형식으로 / 회원정보 저장!
	return jsonify({'result': 'success', 'msg': '회원가입 완료!'})


# 			ㅡㅡㅡㅡㅡ 로그인 ㅡㅡㅡㅡㅡ
# id, pw를 받아서 맞춰보고, 토큰을 만들어 발급.
@app.route('/login', methods=['POST'])
def api_login():
	insta_id_receive = request.form['insta_id_give']
	password_receive = request.form['password_give']

	# 회원가입 때와 같은 방법으로 pw를 암호화 실행.
	password_hash_receive = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()

	# id, 암호화된pw을 가지고 해당 유저를 찾음.
	result = db.user_info.find_one({'insta_id': insta_id_receive, 'password': password_hash_receive})

	# 찾으면 JWT 토큰을 만들어 발급.
	if result is not None:
		# JWT 토큰에는, payload와 시크릿키가 필요합니다.
		# 시크릿키가 있어야 토큰을 디코딩(=암호화 풀기)해서 payload 값을 볼 수 있습니다.
		# 아래에선 id와 exp를 담았습니다. 즉, JWT 토큰을 풀면 유저ID 값을 알 수 있습니다.
		# exp에는 만료시간을 넣어줍니다. 만료시간이 지나면, 시크릿키로 토큰을 풀 때 만료되었다고 에러가 납니다.
		payload = {
			'id': insta_id_receive,
			'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=60*60*24)		# 라이브러리 이용해서 활성화 완료 일단은 안됨xxxx
		}
		token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
		
		# token을 주고.
		return jsonify({'result': 'success', 'token': token})
	# 찾지 못하면
	else:
		return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})




# [유저 정보 확인 API]
# 로그인된 유저만 call 할 수 있는 API입니다.
# 유효한 토큰을 줘야 올바른 결과를 얻어갈 수 있습니다.
@app.route('/name', methods=['GET'])
def api_valid():
	token_receive = request.cookies.get('mytoken')

	# try / catch 문?
	# try 아래를 실행했다가, 에러가 있으면 except 구분으로 가란 얘기입니다.

	try:
		# token을 시크릿키로 디코딩.
		# 보실 수 있도록 payload를 print 해두었습니다. 우리가 로그인 시 넣은 그 payload와 같은 것이 나옵니다.
		payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
		print(payload)

		# payload 안에 id가 들어있습니다. 이 id로 유저정보를 찾습니다.
		# 여기에선 그 예로 닉네임을 보내주겠습니다.
		userinfo = db.user_info.find_one({'insta_id': payload['id']}, {'_id': 0})
		return jsonify({'result': 'success', 'user_name': userinfo['name']})

	except jwt.ExpiredSignatureError:
		# 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
		return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
	except jwt.exceptions.DecodeError:
		return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})


# 		ㅡㅡㅡㅡㅡ profile ㅡㅡㅡㅡㅡ
@app.route("/mypage/user", methods=["POST"])
def profile_info(): # 프로필 정보
	pf_img_receive = request.form['pf_img_give']

	doc = { # db에 입력되는 user의 정보
		'pf_img': pf_img_receive
	}

	db.profile_info.insert_one(doc)
	return jsonify({'msg': '프로필 작성 완료!'}) # 굳이 필요한가?


@app.route("/mypage/user", methods=["GET"]) # user_info + post + 프로필사진!!!!!!!!!!!!!!!
def prof_output():  # 회원정보에서 아이디와 이름을 받아오고, 이름을 프로필에 보여줌(아이디는 신원 확인용)
	token_receive = request.cookies.get('mytoken')
	payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

	profile_id = db.user_info.find_one({"insta_id": payload["id"]})['insta_id']
	user_info_list = list(db.user_info.find({}, {'_id': False}))
	post_list = list(db.post_info.find({}, {'_id': False}))
	print(post_list)
	# follow, following 에서도 숫자 받아와야지 len
	return jsonify({'result': 'success','profile_id': profile_id,'user_info_list': user_info_list, 'post': post_list})



# 		ㅡㅡㅡㅡㅡ post ㅡㅡㅡㅡㅡ
# 게시글 순서 : +버튼 클릭 -> 사진 드래그해서 등록 -> 문구 입력, 위치 추가 -> '공유하기' 버튼 눌러서 등록
@app.route('/posting', methods=['POST'])
def posting():
	token_receive = request.cookies.get('mytoken')
	payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

	author_receive = db.user_info.find_one({"insta_id": payload["id"]})["insta_id"]
	feed_posting_receive = request.form['feed_posting_give']
	photo = request.files['photo_give']

	# 해당 파일에서 확장자명만 추출
	extension = photo.filename.split('.')[-1]

	# 파일 이름이 중복되면 안되므로, 지금 시간을 해당 파일 이름으로 만들어서 중복이 되지 않게 함!
	today = datetime.datetime.now()
	mytime = today.strftime('%Y-%m-%d-%H-%M-%S')
	filename = f'{photo.filename}-{mytime}'

	# 파일 저장 경로 설정 (파일은 db가 아니라, 서버 컴퓨터 자체에 저장됨)
	save_to = f'static/img/{filename}.{extension}'
	# 파일 저장!
	photo.save(save_to)

	# 아래와 같이 입력하면 db에 추가 가능!
	doc = {
        'author': author_receive,
        'post':feed_posting_receive,
        'img':f'{filename}.{extension}'
        }
	db.post_info.insert_one(doc)

	return jsonify({'result':'success', 'msg':'포스팅 완료'})


@app.route("/posting", methods=["GET"]) # 게시글에 들어가는 회원 아이디, 게시글꺼 다 받아와서 쏴주세요~
def feed_post():  # 회원정보에서 아이디와 이름을 받아오고, 이름을 프로필에 보여줌(아이디는 신원 확인용)
	token_receive = request.cookies.get('mytoken')
	payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

	post_info_list = list(db.post_info.find( {'author': payload['id']},{'_id': False} ))
	comment_info_list = list(db.comment_info.find( {},{'_id': False} ))
	# print(payload["id"])
	# print(post_info_list)
	return jsonify({'post_info': post_info_list, 'comment_info': comment_info_list})


# 			ㅡㅡㅡㅡㅡ comment ㅡㅡㅡㅡㅡ


@app.route("/comment", methods=["POST"])
def comment_info():
	token_receive = request.cookies.get('mytoken')
	payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])

	cm_writer_receive = db.user_info.find_one({"insta_id": payload["id"]})
	cm_receive = request.form['cm_give']

	post_serial = db.post_info.find_one.ObjectId("_id")
	print(post_serial)

	doc = {
		# 'post_serial': ObjectId(post_serial['_id']).str
		'cm_writer': cm_writer_receive['insta_id'],
		'cm': cm_receive
	}

	db.comment_info.insert_one(doc)

	return jsonify({'msg': '댓글작성 완료!'})


@app.route("/comment", methods=["GET"])
def comment_output():
	comment_info_list = list(db.comment_info.find({}, {'_id': False}))
	return jsonify({'comment_info': comment_info_list})



# following & follower ###########################################


@app.route("/mars", methods=["POST"])
def following_info(): # 팔로잉 정보 입력
	from_user_id_receive = request.form['from_user_id']
	to_user_id_receive = request.form['to_user_id']

	doc = { # db에 입력되는 user의 정보
		'from_user_id': from_user_id_receive, # 로그인한 아이디
		'to_user_id': to_user_id_receive # 로그인한 아이디가 팔로잉하는 아이디
	}

	db.following_info.insert_one(doc)
	return jsonify({'msg': '팔로잉!'})


@app.route("/mars", methods=["POST"])
def follower_info(): # 팔로잉 정보 입력
	from_user_id_receive = request.form['from_user_id'] # 로그인한 아이디를 팔로우하는 사람의 아이디
	to_user_id_receive = request.form['to_user_id'] # 로그인한 아이디

	doc = { # db에 입력되는 user의 정보
		'from_user_id': from_user_id_receive,
		'to_user_id': to_user_id_receive
	}

	db.follower_info.insert_one(doc)
	return jsonify({'msg': '팔로워!'})



if __name__ == '__main__':
	app.run('0.0.0.0', port=5000, debug=True)
