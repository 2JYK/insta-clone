function save_user_info() {
    const contact = $('#contact').val();
    const name = $('#name').val();
    const insta_id = $('#user_id').val();
    const password = $('#password').val();

    $.ajax({
        type: 'POST',
        url: '/signup',
        data: {contact_give: contact, name_give: name, insta_id_give: insta_id, password_give: password},
        success: function (response) {
            alert(response['msg'])
            window.location.href = '/login';
        }
    });
}