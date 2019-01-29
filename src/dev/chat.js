//Created by Dogus ATASOY 10-28-2017 20:49

var DogusChat = function() {
  var _this = this;
  _this.views = new DogusChatViews();
  _this.modal = new DogusChatModal();
  _this.nickExpireDurationMS = 1500000;

  _this.modal.onMessageReceived = function(msg) {
    if (qs(".chat-shout-balloon[muid='" + msg.uid + "']").length > 0) {
      qs(".chat-shout-balloon[muid='" + msg.uid + "']")[0].setAsSent();
    } else {
      _this.insertMessage(msg);
    }
  };

  _this.onMessageSent = function() {};

  _this.sendMessage = function() {
    if (_this.messageTextField.getValue().trim() !== "" && _this.nickNameField.getValue().trim() !== "") {
      var _msgObject = {
        nickname: _this.nickNameField.getValue(),
        message: _this.messageTextField.getValue(),
        uid: "ac-muid-" + guid()
      };
      _this.insertMessage(_msgObject, true);

      _this.messageTextField.setValue("");
      _this.modal.sendMessage(
        _msgObject,
        function(msg) {
          _this.onMessageSent(msg);
        },
        function(err) {
          console.log("Message Send Failed!!");
        }
      );
    }
  };

  _this.initNickname = function() {
    if (localStorage.getItem("chat-nickname") && localStorage.getItem("chat-nickname").trim() !== "") {
      _this.nickNameField.setValue(localStorage.getItem("chat-nickname"));
    }
  };

  _this.updateMessages = function(messages) {
    _this.messageListWrapper.empty();
    for (var i = 0; i < messages.length; i++) {
      _this.messageListWrapper.appendChild(_this.views.chatBalloon(messages[i],
        (messages[i].nickname === _this.nickNameField.getValue())));
    }
    _this.messageListWrapper.scrollTop = _this.messageListWrapper.scrollHeight + _this.messageListWrapper.scrollTop;
  };

  _this.insertMessage = function(msg, waiting) {
    _this.messageListWrapper.appendChild(_this.views.chatBalloon(msg, (msg.nickname === _this.nickNameField.getValue()), waiting));
    _this.messageListWrapper.scrollTop = _this.messageListWrapper.scrollHeight + _this.messageListWrapper.scrollTop + 1000;
  };

  _this.prepareViews = function(wrapper) {
    _this.wrapper = wrapper.isDomElement ? wrapper : ((typeof wrapper == "string" &&
      qs(wrapper).length > 0) ? qs(wrapper)[0] : document.createDomElement({
      nodeType: "div"
    }));
    _this.messageListWrapper = _this.views.messageListView();
    _this.messageSendWrapper = _this.views.messageSendView();

    _this.nickNameField = _this.views.nickNameField();
    _this.initNickname();

    _this.messageTextField = _this.views.messageTextField();
    _this.messageTextField.onSend = function() {
      localStorage.setItem("chat-nickname", _this.nickNameField.getValue());
      _this.sendMessage();
    };

    _this.messageSendWrapper.appendChild(_this.nickNameField);
    _this.messageSendWrapper.appendChild(_this.messageTextField);

    _this.wrapper.appendChild(_this.messageListWrapper);
    _this.wrapper.appendChild(_this.messageSendWrapper);

  };

  _this.getWrapper = function() {
    return _this.wrapper;
  };

  _this.init = function(wrapper) {
    _this.prepareViews(wrapper);
    _this.modal.getMessages(function(messages) {
      _this.updateMessages(messages);
    });
  };

  return _this;
};