function createMessage() {
  $('#new-message').focus();
  var newMsg = $('#new-message').val();
  var roomName = window.location.pathname.split("/")[2];

  if (newMsg !== "") {
    $.ajax({
      url: '/messages',
      method: 'post',
      dataType: 'json',
      data: {
        content: newMsg,
        room_name: roomName,
      }
    }).done(function(data) {
      var chatBox = $('.chat-box');
      console.log(data.user);
      var userName = data.user;
      var msgBox = $('<div>').addClass('message-box').hide();
      msgBox.attr('id', userName);
      if ($('.message-box').eq(0).attr('id') === userName) {
        msgBox.addClass('right');
      }
      $('<p>').text(newMsg).appendTo(msgBox);
      chatBox.prepend(msgBox);
      msgBox.slideDown(500);
      $('textarea').val("");
    });
  }
}