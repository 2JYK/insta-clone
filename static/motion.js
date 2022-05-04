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

//          ㅡㅡㅡㅡㅡㅡㅡPOSTㅡㅡㅡㅡㅡㅡㅡㅡ
function save() {
  $.ajax({
    type: 'POST',
    url: '',
    data: { },
    success: function (response) {
      alert(response['msg'])
      window.location.reload()
    }
  });
}

$('.carousel').carousel({
  interval: false,
});