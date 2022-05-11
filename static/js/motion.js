//  ㅡㅡㅡㅡㅡ 더보기란 ㅡㅡㅡㅡㅡ
$(document).ready(function () {
    // 사진 상세보기기능- 댓글 모두보기 클릭시
    $('#modal_open').click(function () {
        $('#modal').show();
    })
    $("#modal_close").click(function () {
        $('#modal').hide();
    })

    // 사진 상세보기기능- 댓글 모두보기 클릭시
    show_comment();

    $('.show').each(function () {
        var content = $(this).children('.show-2');
        var content_txt = content.text();
        var content_txt_short = content_txt.substring(0, 40) + "...";
        var btn_more = $('<a href="javascript:void(0)" class="more" style="color: #9E9E9E;">더 보기</a>');


        $(this).append(btn_more);

        if (content_txt.length >= 20) {
            content.html(content_txt_short)

        } else {
            btn_more.hide()
        }

        btn_more.click(toggle_content);

        function toggle_content() {
            if ($(this).hasClass('short')) {
                // 접기 상태
                $(this).html('더 보기');
                content.html(content_txt_short)
                $(this).removeClass('short');
            } else {
                // 더보기 상태
                $(this).html('접기');
                content.html(content_txt);
                $(this).addClass('short');
            }
        }
    });
    // 드롭박스-유저-로그아웃
    $("#logout").click(function () {
        $.removeCookie('mytoken');
        console.log('mytoken')
        alert('로그아웃')
        window.location.href = '/login'
    })
})

//          ㅡㅡㅡㅡㅡㅡㅡ [...] 모달ㅡㅡㅡㅡㅡㅡㅡㅡ
$(function () {
    $("#confirm").click(function () {
        modalClose(); //모달 닫기
    });

    $("#modal-open").click(function () {
        $("#popup").css('display', 'flex').hide().fadeIn();
        //팝업을 flex속성으로 바꿔준 후 hide()로 숨기고 다시 fadeIn()으로 효과
    });

    $("#close").click(function () {
        modalClose(); //모달 닫기
    });

    function modalClose() {
        $("#popup").fadeOut(); //페이드아웃
    }
});

// // const modal = document.getElementById("feed_modal_in");
//
// // const mango = document.getElementById("modal_open");
//
// mango.addEventListener("click", e => {
//     modal.style.top = window.pageYOffset + 'px'; // top을 이용해 시작 y위치를 바꿔줌
//     modal.style.display = "flex";
//
//     document.body.style.overflowY = "hidden"; // 스크롤 없애기
// });

$(function () {
    $("#confirm").click(function () {
        modalClose(); //모달 닫기
    });

    $("#modal-open1").click(function () {
        $("#popup1").css('display', 'flex').hide().fadeIn();
        //팝업을 flex속성으로 바꿔준 후 hide()로 숨기고 다시 fadeIn()으로 효과
    });

    $("#close1").click(function () {
        modalClose(); //모달 닫기
    });

    function modalClose() {
        $("#popup1").fadeOut(); //페이드아웃
    }
});


$(function () {
    $("#confirm").click(function () {
        modalClose(); //모달 닫기
    });

    $("#modal-open2").click(function () {
        $("#popup2").css('display', 'flex').hide().fadeIn();
        //팝업을 flex속성으로 바꿔준 후 hide()로 숨기고 다시 fadeIn()으로 효과
    });

    $("#close2").click(function () {
        modalClose(); //모달 닫기
    });

    function modalClose() {
        $("#popup2").fadeOut(); //페이드아웃
    }
});


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

function save_comment() {
    const cm = $('#cm').val();

    $.ajax({
        type: 'POST',
        url: '/comment',
        data: { cm_give: cm },
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
            for (let i = 0; i < comments.length; i++) {
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




//        ㅡㅡㅡㅡㅡ [+] feed modal  ㅡㅡㅡㅡㅡ
const modal = document.getElementById("feed_modal_in");

const buttonAddFeed = document.getElementById("feed");

buttonAddFeed.addEventListener("click", e => {
    modal.style.top = window.pageYOffset + 'px'; // top을 이용해 시작 y위치를 바꿔줌
    modal.style.display = "flex";

    document.body.style.overflowY = "hidden"; // 스크롤 없애기
});

// 모달 닫기 코드
const buttonCloseModal = document.getElementById("close_modal");
buttonCloseModal.addEventListener("click", e => {
    modal.style.display = "none";
    document.body.style.overflowY = "visible";

    console.log(window.pageYOffset + " 좌표"); // 좌표 찍어보기
});


//   ㅡㅡㅡㅡㅡ [+] feed modal API ㅡㅡㅡㅡㅡ
function posting() {
    let feed_posting = $('#feed_posting').val()
    let photo = $('#photo')[0].files[0]
    let form_data = new FormData()

    form_data.append("feed_posting_give", feed_posting)
    form_data.append("photo_give", photo)

    $.ajax({
        type: "POST",
        url: "/posting",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}

function show_posting() {
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
            function append_temp_html(id, post, img) {
                temp_html = `            
                  <div id="binds">
                    <div class="card" id="main-2">
                      <li class="list-group-item">
                
                        <div id="bind" class="feed_start">
                          <!----------------------   카드 윗부분(모달창(팝업)- 사진-이름) ----------------------------->
                          <div class="container">
                
                            <div class="modal-box">
                              <div class="modal-icon">
                                <i class="fa-solid fa-ellipsis three-dot" id="modal-open"></i>
                              </div>
                            </div>
                
                            <div class="popup-wrap" id="popup">
                              <div class="popup">
                                <div class="popup-body">
                                  <div class="body-content">
                                    <div class="body-contentbox">
                                      <div class="red">신고</div>
                                      <div class="red">팔로우 취소</div>
                                      <div>게시물로 이동</div>
                                      <div>공유 대상...</div>
                                      <div>링크 복사</div>
                                      <div>퍼가기</div>
                                      <div id="close">취소</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                
                            <div class="card_02">
                              <a href="#"></a>
                              <div class="card_img"><img src="../static/img/1.jpg" class="side-smimg"></div>
                            </div>
                
                            <div class="card_03">
                              <p class="card_font">${id}</p>
                            </div>
                          </div>
                          <!-----------------------------   카드 사진 !!!캐러셀 !!!   ----------------------------->
                          <div class="card-body" id="comment-list" style="padding: 5px 0 10px 0;">
                            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="false">
                              <div class="carousel-inner">
                                <div class="carousel-item active" data-bs-interval="false">
                                  <img src="../static/img/${img}" class="d-block w-100" alt="...">
                                </div>
                              </div>
                              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                              </button>
                              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                              </button>
                            </div>
                            <!--      캐러셀 밑의 아이콘들  -->
                            <div class="card-main">
                              <a href="#">
                                <span class="card-title">
                                  <i class="fa-regular fa-heart fa-lg"></i>
                                  <i class="fa-regular fa-comment-dots fa-lg"></i>
                                  <i class="fa-regular fa-paper-plane fa-lg"></i>
                                </span>
                              </a>
                              <a href="#">
                                <span class="card-title2">
                                  <i class="fa-regular fa-bookmark fa-lg"></i>
                                </span>
                              </a>
                            </div>
                            <!--   카드 사진 좋아요한 사람들 -->
                            <p class="card-text font">chulsu_powerful 님 외 3명이 좋아합니다</p>
                            <!--   카드 작성자와 작성글, 더보기 -->
                            <div class="show">
                              <div class="show-2">
                                ${post}
                              </div>
                            </div>
                            <!--    댓글과 작성시간   -->
                
                            <div class="card-modal">
                              <!------ Modal ------>
                              <div id="modal" class="modal">
                
                                <div><button class="modal_close" id="modal_close">
                                <svg aria-label="Close" class="_8-yf5 " color="#ffffff" fill="#ffffff" height="24" role="img" viewBox="0 0 24 24" width="24"><polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></polyline><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line></svg>
                                </button></div>
                
                                <div class="modal_box">
                
                                  <div class="modal_left">
                                    <img alt="" src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
                                      style="width: 750px; height: 760px;">
                                  </div>
                                  <div class="modal_right">
                                    <!--  modal 안에 있는 게시물 작성자-->
                                    <div class="modal_pf">
                                      <div><img style="width: 40px; border-radius: 50%"
                                          src="https://ca.slack-edge.com/T039CS8AH0D-U03A6RBGK60-faffa361ecd3-512">
                                      </div>
                                      <div class="modal_pf_name">${id}</div>
                                    </div>
                                    <!--  modal 안에 있는 게시물 설명-->
                
                                    <div class="modal_desc">
                                      <div><img style="width: 40px; border-radius: 50%"
                                          src="https://ca.slack-edge.com/T039CS8AH0D-U03A6RBGK60-faffa361ecd3-512">
                                      </div>
                                      <div class="modal_pf_name">${id}</div>
                                      <p class="modal_desc_write">${post}</p>
                                    </div>
                                    <!--  modal 게시물에 달린 댓글 시작-->
                                    <div class="comments" id="comments"></div>
                                    <div>
                                      <div class="icon_box">
                                        <div class="card-main">
                                          <a href="#">
                                            <span class="card-title">
                                              <i class="fa-regular fa-heart fa-lg"></i>
                                              <i class="fa-regular fa-comment-dots fa-lg"></i>
                                              <i class="fa-regular fa-paper-plane fa-lg"></i>
                                            </span>
                                          </a>
                                          <a href="#">
                                            <span class="card-title2">
                                              <i class="fa-regular fa-bookmark fa-lg"></i>
                                            </span>
                                          </a>
                                        </div>
                                        <div class="modal_like">
                                          <img style="width: 25px; border-radius: 50%"
                                            src="https://ca.slack-edge.com/T039CS8AH0D-U03A0MUBSQH-0e4deb8911e1-512">
                                          <span class="bold">juhyun.1011</span>님 외 <span class="bold">34</span>명이 좋아합니다.
                                        </div>
                                        <div class="modal_time">
                                          3시간 전
                                        </div>
                                      </div>
                                    </div>
                                    <div class="write_comment">
                                      <div class="emogi">
                                        <svg aria-label="Emoji" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
                                      </div>
                                      <div class="write">
                                        <input id="cm" type="text"
                                          style="border: transparent; outline: none; width: 460px; height: 27px;"
                                          placeholder="댓글 달기..." />
                                      </div>
                                      <button class="register" onclick="save_comment()">
                                        게시
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                
                
                              <!-- Modal End -->
                              <p id="modal_open">댓글 모두 보기</p>
                            </div>
                
                
                            <div class="contents">
                <!--              <p id="name">name<span id="comment">comment</span></p>-->
                            </div>
                
                            <a href="#">
                              <div class="more">
                                4시간 전..
                              </div>
                            </a>
                          </div>
                          <!-----------------------------    댓글 input + 게시   ----------------------------->
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item" style="border-top: 1px solid rgb(219, 219, 219)">
                
                <!--              <div class="write_comment">-->
                                      <div class="emogi">
                                        <svg aria-label="Emoji" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
                                      </div>
                
                                      <div class="write-main">
                                        <input id="input_comment" type="text"
                                          style="border: none; outline: none; width: 350px; outline: none; background-color: transparent;"
                                          placeholder="댓글 달기..." />
                                      </div>
                
                                      <button class="register" onclick="save()">
                                        게시
                                      </button>
                <!--                    </div>-->
                
                            </li>
                          </ul>
                        </div>
                
                      </li>
                    </div>
                  </div>
              `
                $('#binds').append(temp_html)
            }
        }
    });
}
// [+] modal GET 호출
show_posting()



// ㅡㅡㅡㅡㅡㅡㅡ메인 피드에서 직접 댓글달기(댓글 더보기 x)ㅡㅡㅡㅡㅡㅡㅡㅡ
function save() {
    let comment = $("#input_comment").val();

    $.ajax({
        type: 'POST',
        url: '/comment',
        data: { cm_give: comment },
        success: function (response) {
            window.location.reload();
        }
    });
}
