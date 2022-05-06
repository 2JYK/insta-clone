// ['쿠키'라는 개념에 대해 알아봅시다]
// 로그인을 구현하면, 반드시 쿠키라는 개념을 사용.
// 페이지에 관계없이 브라우저에 임시로 저장되는 정보. 키:밸류 형태(딕셔너리 형태)로 저장.
// 쿠키가 있기 때문에, 한번 로그인하면 네이버에서 다시 로그인할 필요가 없는 것.
// 브라우저를 닫으면 자동 삭제되게 하거나, 일정 시간이 지나면 삭제되게 할 수 있음.

function login() {
    $.ajax({
        type: "POST",
        url: "/login",
        data: {
            insta_id_give: $('#user-id').val(),
            password_give: $('#user-pw').val()
        },
        success: function (response) {
            if (response['result'] == 'success') {
                // 로그인이 정상적으로 되면, 토큰을 받아옴.
                // 이 토큰을 mytoken이라는 키 값으로 쿠키에 저장.
                $.cookie('mytoken', response['token']);

                alert('로그인 완료!')
                window.location.href = '/'
            } else {
                // 로그인이 안되면 에러메시지를 띄움.
                alert(response['msg'])
            }
        }
    })
}