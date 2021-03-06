function createMessage() {
  $('#new-message').focus();
  var newMsg = $('#new-message').val();
  // var roomName = $('.room-name').text();
  var roomName = window.location.pathname.split('/')[2];

  if (newMsg.trim() !== "") {
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
      var msgBox = $('<div>').addClass('message-box').hide();
      var user = data.user;
      var avatarBox = $('<div>').addClass('message-avatar').addClass('avatar');
      var avatarImage = $('#' + user + '_' + data.obj.emotion).clone();
      avatarImage.appendTo(avatarBox);
      avatarBox.appendTo(msgBox);
      msgBox.attr('id', user).addClass('right');
      msgBox.attr('msg_id', data.msg_id);
      var messageContent = $('<div>').addClass('message-content');
      var arrowBox = $('<div>').addClass('arrow_box');
      var msgText = data.obj.content;

      if (msgText.indexOf("http") >= 0) {
        arrowBox.append($('<a>').attr('href', msgText).text(msgText)).appendTo(messageContent);
        if (msgText.indexOf(".gif") >= 0 || msgText.indexOf(".jpg") >= 0 || msgText.indexOf(".png") >= 0) {
          arrowBox.append($('<img>').attr('src', msgText).attr('class', 'message-image')).appendTo(messageContent);
        }
      } else {
        arrowBox.text(msgText).appendTo(messageContent);
      }
      messageContent.appendTo(msgBox);
      chatBox.prepend(msgBox);
      msgBox.slideDown(400);
      $('#new-message').val("");
    });
  }
}