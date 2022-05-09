$(document).ready(function () {

    $('#modal_open').click(function() {
        $('#modal').show();
    })
    $("#modal_close").click(function () {
      $('#modal').hide();
    })

     $('#modal_open2').click(function() {
        $('#modal2').show();
    })
    $("#modal_close2").click(function () {
      $('#modal2').hide();
    })

    // 드롭박스-유저-로그아웃
    $("#logout").click(function() {
        $.removeCookie('mytoken');
        console.log('mytoken')
        alert('로그아웃')
        window.location.href='/login'
    })

    show_insta_id();
    show_comment();
})

// function give_photo() {
//     const pf_img = $('#img').src;
//     console.log(pf_img)
//
//     $.ajax({
//         type: 'POST',
//         url: '/mypage',
//         data: {pf_img_give: pf_img},
//         success: function (response) {
//             alert(response['msg'])
//             window.location.reload();
//         }
//     });
// }

function show_insta_id() {
    $.ajax({
        type: 'GET',
        // 경로 설정에서 자꾸 에러가 발생해 mypage 뒤에 경로를 하나 더 추가해주었다.
        url: '/mypage/user',
        data: {},
        success: function (response) {
            const prof_name = response['user_info_list']
            const name = prof_name[0]['name']
            const insta_id = prof_name[0]['insta_id']
            let temp_html = `<div class="user_id">${insta_id}</div>
                                  <div>
                                      <div class="state">
                                          <div><a class="state_num" href="">게시물 81</a></div>
                                          <div><a class="state_num" href="">팔로워 251</a></div>
                                          <div><a class="state_num" href="">팔로우 271</a></div>
                                      </div>
                                  </div>
                              <div class="user_name">${name}</div>`
            $('#upper_right').append(temp_html);
        }
    });
}

function save_comment() {
    const cm = $('#cm').val();

    $.ajax({
        type: 'POST',
        url: '/mypage/comment',
        data: {cm_give: cm},
        success: function (response) {

            window.location.reload();
        }
    });
}

// 코멘트 부분 GET 요청 작성해야함!겟 받아와서 사용자한테 또 보여줘야죠
function show_comment() {
    $.ajax({
        type: "GET",
        url: "/mypage/comment",
        data: {},
        success: function (response) {
            const comments = response['comment_info']
            console.log(comments)
            for (let i=0; i < comments.length;i++) {
                const writer = comments[i]['cm_writer']['insta_id']
                const comment = comments[i]['cm']

                const temp_html = `<div class="show_comment">
                                        <div><img style="width: 40px; border-radius: 50%"
                                                  src="https://ca.slack-edge.com/T039CS8AH0D-U03A0MUBSQH-0e4deb8911e1-512">
                                        </div>
                                        <div class="modal_pf_name">${writer}</div>
                                        <div class="modal_desc_wrtie" id="cm">${comment}</div>
<!--                                        댓글단 시간 측정하는거랑 좋아요 개수에 대한 칸을 만들고 작성해야함!-->
                                    </div>`
                $('#comments').append(temp_html)
            }
        }
    });
}

// 드롭박스-히스토리
function history() {
    // id 값 drophis의 display 값이 block 이면
    if ($('#history').css('display') == 'block') {
        // drophis를 가리고
        $('#history').hide();
    } else {
        // 아니면 drophis를 펴라
        $('#history').show();
    }
}
// 드롭박스-유저
function profile() {
    // id 값 dropbox의 display 값이 block 이면
    if ($('#profile').css('display') == 'block') {
        // dropbox를 가리고
        $('#profile').hide();
    } else {
        // 아니면 dropbox를 펴라
        $('#profile').show();
    }
}