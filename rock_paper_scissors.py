# 랜덤한 숫자를 받아오기 위해 random import
import random

print("============================================")
print("랜덤 컴퓨터를 이겨라! / 10번의 게임 중 3번 이기면 승리!")
print("============================================")

# 사용자가 이기는 횟수를 저장하기 위한 변수 cnt 생성
cnt = 0
# 사용자가 이기는 경우를 제외한 모든 케이스의 횟수 저장하기 위한 변수 no_cnt 생성
no_cnt = 0
# 게임의 횟수를 저장하기 위한 변수 game_cnt 생성
game_cnt = 0

while True:
    # 게임 카운트가 10번까지일 때 게임 진행
    if game_cnt < 10:
        # 가위, 바위, 보를 리스트에 넣어놓음. 즉 리스트의 index 값인 0, 1, 2를 사용하겠다는 뜻
        # option[0] = '가위', option[1] = '바위', option[2] = '보'
        option = ['가위', '바위', '보']

        # randint를 사용해서 0부터 2까지의 숫자 중 하나를 랜덤하게 뱉어내게 하고, 그 숫자를 computer란 변수에 저장
        computer_choice = random.randint(0, 2)
        # 랜덤으로 받은 숫자를 option 리스트의 index 값으로 사용해 computer_value 변수에 저장
        computer_value = option[computer_choice]

        # 사용자는 랜덤이 아니라 직접 숫자를 고르도록 함
        while True:
            user_choice = input("가위, 바위, 보 중 하나를 입력하시오. : ")
            if user_choice in option:
                user_value = user_choice
                break
            else:
                print("값을 제대로 입력하세요.")

        print(f'플레이어는 {user_value}를 선택, 컴퓨터는 {computer_value}를 선택했습니다')

        # 가위 바위 보의 결과에 따라 승패 혹은 무승부 지정
        # 무승부의 경우를 하나로 빼버림
        if computer_value == user_value:
            result = 'draw'
            print('비겼습니다')
        # 사용자가 가위를 냈을 때
        elif user_value == '가위':
            if computer_value == '바위':
                result = 'lose'
                print('졌습니다')
            else:  # 사용자가 보를 냈을 때 / 해당 경우 이후에는 이벤트가 없으므로 else로 처리
                result = 'win'
                print('이겼습니다')
        # 사용자가 바위를 냈을 때
        elif user_value == '바위':
            if computer_value == '보':
                result = 'lose'
                print('졌습니다')
            else:  # 사용자가 가위를 냈을 때 / 해당 경우 이후에는 이벤트가 없으므로 else로 처리
                result = 'win'
                print('이겼습니다')
        # 사용자가 보를 냈을 때
        elif user_value == '보':
            if computer_value == '가위':
                result = 'lose'
                print('졌습니다')
            else:  # 사용자가 바위를 냈을 때 / 해당 경우 이후에는 이벤트가 없으므로 else로 처리
                result = 'win'
                print('이겼습니다')

        # 결과 카운트
        if result == 'win': # 만약 사용자가 이겼다면
            cnt += 1
            print(f"당신이 이긴 횟수 : {cnt}")
            # 만약 cnt 값이 3이 되어 사용자가 이기게 된다면
            if cnt == 3:
                print("@@@@@@@ 당신이 승리하였습니다. @@@@@@@")
                break
        else: # 만약 사용자가 이기지 못했다면
            no_cnt += 1

        game_cnt += 1
        print(f"남은 게임 횟수 : {10 - game_cnt} / 10")
    # 게임 카운트가 10번을 넘겼는 데 못이기면
    else:
        print("당신은 루저입니다. ㅋ")
        break

