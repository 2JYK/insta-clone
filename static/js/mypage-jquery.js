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
            const user = response['user_info_list']
            const id = response['profile_id']
            let name = ``
            for (let i=0; i < user.length; i++) {
                if (id === user[i]['insta_id']) {
                    name = user[i]['name']
                }
            }
            const post = response['post'].length

            let temp_html = `<div class="user_id">${id}</div>
                                  <div>
                                      <div class="state">
                                          <div><a class="state_num" href="">게시물 ${post}</a></div>
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
        url: '/comment',
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
        url: "/comment",
        data: {},
        success: function (response) {
            const comments = response['comment_info']
            console.log(comments)
            for (let i=0; i < comments.length;i++) {
                const writer = comments[i]['cm_writer']
                const comment = comments[i]['cm']

                const temp_html = `<div class="show_comment">
                                        <div><img style="width: 40px; border-radius: 50%"
                                                  src="https://ca.slack-edge.com/T039CS8AH0D-U03A0MUBSQH-0e4deb8911e1-512">
                                        </div>
                                        <div class="modal_pf_name">${writer}</div>
                                        <div class="modal_desc_write">${comment}</div>
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

window.onload = function show_posting() {
    $.ajax({
        type: 'GET',
        url: '/posting',
        data: {},
        success: function (response) {
            let postings = response['post_info']
            for (let i = 0; i < postings.length; i++) {
                console.log(postings[i].author,
                    postings[i].post,
                    postings[i].img)
                append_temp_html(
                    postings[i].author,
                    postings[i].post,
                    postings[i].img)
            }
            // let comments = response['comment_info']
            // for (let i = 0; i < comments.length; i++) {
            //     let writer = comments[i].cm_writer
            //     let content = comments[i].cm
            // }
            function append_temp_html(id, post, img) {
                temp_html = `<div style="width: 293px; height: 293px; margin: 0px 28px 28px 0px;">
                    <img id="modal_open" alt=""
                         src="/static/img/${img}"
                         style="width: 293px; height: 293px;">
                    <!------ Modal ------>
                    <div id="modal" class="modal">
                        <div class="modal_box">
                            <div class="modal_left">
                                <img alt=""
                                     src="/static/img/${img}"
                                     style="width: 750px; height: 760px;">
                            </div>
                            <div class="modal_right">
                                <!--  modal 안에 있는 게시물 작성자-->
                                <div class="modal_pf">
                                    <div><img style="width: 40px; border-radius: 50%"
                                              src="https://ca.slack-edge.com/T039CS8AH0D-U03A6RBGK60-faffa361ecd3-512">
                                    </div>
                                    <div class="modal_pf_name">${id}</div>
                                    <div class="modal_close" id="modal_close"><span>X</span></div>
                                </div>
                                <!--  modal 안에 있는 게시물 설명-->
                                <div class="modal_desc">
                                    <div><img style="width: 40px; border-radius: 50%"
                                              src="https://ca.slack-edge.com/T039CS8AH0D-U03A6RBGK60-faffa361ecd3-512">
                                    </div>
                                    <div class="modal_pf_name">kksu_97</div>
                                    <p class="modal_desc_write">${post}</p>
                                </div>
                                <!--  modal 게시물에 달린 댓글 시작-->
                                <div class="comments" id="comments"></div>
                                <div>
                                    <div class="icon_box">
                                        <div class="modal_icon">
                                            <i class="fa-regular fa-heart fa-lg"></i>
                                            <i class="fa-regular fa-comment-dots fa-lg"></i>
                                            <i class="fa-regular fa-paper-plane fa-lg"></i>
                                        </div>
                                        <div class="modal_like">
                                            <img style="width: 25px; border-radius: 50%" src="https://ca.slack-edge.com/T039CS8AH0D-U03A0MUBSQH-0e4deb8911e1-512">
                                            <span class="bold">juhyun.1011</span>님 외 <span class="bold">34</span>명이 좋아합니다.
                                        </div>
                                        <div class="modal_time">
                                            3시간 전
                                        </div>
                                    </div>
                                </div>
                                <div class="write_comment">
                                    <div class="emogi">
                                        <i style="width: 40px; height: 40px" class="fa-regular fa-face-grin"></i>
                                    </div>
                                    <div class="write">
                                        <input id="cm" type="text" style="border: transparent; outline: none; width: 460px; height: 27px;" placeholder="댓글 달기..."/>
                                    </div>
                                    <button class="register" onclick="save_comment()">
                                        게시
                                    </button>
                                </div>
                             </div>
                        </div>
                    </div>
                    <!-- Modal End -->
                </div>`
                $('#each-post').append(temp_html)
            }
        }
    });
}