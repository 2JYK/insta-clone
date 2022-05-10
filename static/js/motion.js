//  ㅡㅡㅡㅡㅡ 더보기란 ㅡㅡㅡㅡㅡ
$(document).ready(function () {
    // 사진 상세보기기능- 댓글 모두보기 클릭시
    $('#modal_open').click(function() {
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
    $("#logout").click(function() {
        $.removeCookie('mytoken');
        console.log('mytoken')
        alert('로그아웃')
        window.location.href='/login'
    })
})

//          ㅡㅡㅡㅡㅡㅡㅡ모달ㅡㅡㅡㅡㅡㅡㅡㅡ
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




//        ㅡㅡㅡㅡㅡ feed modal  ㅡㅡㅡㅡㅡ
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


//   ㅡㅡㅡㅡㅡ POST ㅡㅡㅡㅡㅡ
function posting() {
  let feed_posting = $('#feed_posting').val()
  let photo = $('#photo')[0].files[0]
  console.log(photo)
  let form_data = new FormData()

  form_data.append("feed_posting_give", feed_posting)
  form_data.append("photo_give", photo)

    console.log(form_data)
    
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

//          ㅡㅡㅡㅡㅡㅡㅡPOSTㅡㅡㅡㅡㅡㅡㅡㅡ
function save() {
    let comment = $("#input_comment").val();

    $.ajax({
        type: 'POST',
        url: '/comment',
        data: {cm_give: comment},
            success: function (response) {
                window.location.reload();
            }
    });
}