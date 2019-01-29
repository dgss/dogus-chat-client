//Created by Dogus ATASOY 10-28-2017 22:19

var DogusChatViews = function () {
    var _this = this;

    _this.messageListView = function () {
        return document.createDomElement({
            nodeType: "span",
            className: "chat-messages-container"
        });
    };

    _this.messageSendView = function () {
        return document.createDomElement({
            nodeType: "span",
            className: "chat-message-send-container"
        });
    };

    _this.nickNameField = function () {
        var _nicknameField = document.createDomElement({
            nodeType: "input",
            attributes: {type: "text", placeholder: "Nickname"},
            className: "chat-nickname"
        });

        _nicknameField.getValue = function () {
            return _nicknameField.value;
        };
        _nicknameField.setValue = function (val) {
            _nicknameField.value = val.toString();
        };

        return _nicknameField;
    };

    _this.messageTextField = function () {
        var _messageTextFieldWrapper = document.createDomElement({
            nodeType: "div",
            className: "chat-message-text-wrapper"
        });
        _messageTextFieldWrapper.onSend = function () {
        };

        var _messageTextField = document.createDomElement({
            nodeType: "input",
            attributes: {type: "text", placeholder: "Message"},
            className: "chat-message-text"
        });
        _messageTextField.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                _messageTextFieldWrapper.onSend();
            }
        });

        var _sendButton = document.createDomElement({
            nodeType: "div",
            className: "chat-message-button"
        });
        _sendButton.addEventListener("click", function (e) {
            _messageTextFieldWrapper.onSend();
            _messageTextField.focus();
        });

        _messageTextFieldWrapper.appendChild(_messageTextField);
        _messageTextFieldWrapper.appendChild(_sendButton);

        _messageTextFieldWrapper.getValue = function () {
            return _messageTextField.value;
        };
        _messageTextFieldWrapper.setValue = function (val) {
            _messageTextField.value = val.toString();
        };
        return _messageTextFieldWrapper;
    };

    _this.chatBalloon = function (msg, isSelfText, isWaiting) {
        var _cleaner = document.createDomElement({
            nodeType: "span",
            htmlContent: msg.message
        });
        var _cb = document.createDomElement({
            nodeType: "div",
            attributes: {muid: msg.uid},
            className: ["hide", "chat-shout-balloon", isSelfText ? "self-text" : "", isWaiting ? "waiting-text" : ""],
            htmlContent: "<span class='chat-balloon-inside'><b>" + msg.nickname + "</b><br>" + _cleaner.innerText + "</span>"
        });

        _cb.setAsSent = function () {
            this.removeClass("waiting-text");
        };

        //For a css3 bug on animations and transitions, you have wait after appending the element to change transitional state
        setTimeout(function () {
            _cb.removeClass("hide");
        }, 10);

        return _cb;
    };
};