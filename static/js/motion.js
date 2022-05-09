//  ㅡㅡㅡㅡㅡ 더보기란 ㅡㅡㅡㅡㅡ
$(document).ready(function () {

    $('.show').each(function () {
        var content = $(this).children('.show-2');
        var content_txt = content.text();
        var content_txt_short = content_txt.substring(0, 40) + "...";
        var btn_more = $(
            '<a href="javascript:void(0)" class="more" style="color: #9E9E9E;">더 보기</a>');


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
});

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


//          ㅡㅡㅡㅡㅡㅡㅡPOSTㅡㅡㅡㅡㅡㅡㅡㅡ
function save() {
    $.ajax({
        type: 'POST',
        url: '',
        data: {},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });
}


//        ㅡㅡㅡㅡㅡ feed modal  ㅡㅡㅡㅡㅡ
const modal = document.getElementById("feed_modal");
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

    console.log(window.pageYOffset + " 좌표"); // 로그 찍기
});

// <!-- jquery 부분 -->

$('.modal_img')
    .on("dragover", dragOver)
    .on("dragleave", dragOver)
    .on("drop", uploadFiles);

function dragOver(e) {
  console.log(e)
    e.stopPropagation();
    e.preventDefault();

    if (e.type == "dragover") {
        $(e.target).css({
            "background-color": "black",
            "outline-offset": "-20px"
        });
    } else {
        $(e.target).css({
            "background-color": "white",
            "outline-offset": "-10px"
        });
    }
}

function uploadFiles(e) {
    e.stopPropagation();
    e.preventDefault();

    e.dataTransfer = e.originalEvent.dataTransfer;

    var files = e.dataTransfer.files;

    if (files.length > 1) {
        alert('이미지를 하나만 올리시오.');
        return;
    }

    if (files[0].type.match(/image.*/)) {
        $('#feed_modal_in').css({
            display : 'flex'
        });
        $('.modal_img_feed').css({
            "background-image": "url(" + window.URL.createObjectURL(files[0]) + ")",
            "outline": "none",
            "background-size": "contain",
            "background-repeat" : "no-repeat",
            "background-position" : "center"
        });
        $('#feed_modal').css({
            display: 'none'
        })
    } else {
        alert('이미지가 xxxx.');
        return;
    }
}

if (e.type == "dragover") {
  $(e.target).css({
    "background-color": "black",
    "outline-offset": "-20px"
  });
} else {
  $(e.target).css({
    "background-color": "white",
    "outline-offset": "-10px"
  });
}

$('#button_write_feed').on('click', ()=>{
    const image = $('#input_image').css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    const content = $('#input_content').val();
    const profile_image = $('#input_profile_image').attr('src');
    const user_id = $('#input_user_id').text();

    const file = files[0];

    let fd = new FormData();

    fd.append('file', file);
    fd.append('image', image);
    fd.append('content', content);
    fd.append('profile_image', profile_image);
    fd.append('user_id', user_id);

    if(image.length <= 0)
    {
        alert("이미지가 비어있습니다.");
    }
    else if(content.length <= 0)
    {
        alert("설명을 입력하세요");
    }
    else if(profile_image.length <= 0)
    {
        alert("프로필 이미지가 비어있습니다.");
    }
    else if(user_id.length <= 0)
    {
        alert("사용자 id가 없습니다.");
    }
    else{
        writeFeed(fd);
        console.log(files[0]);
    }
});