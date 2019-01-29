//Created by Dogus ATASOY 10-28-2017 21:22

var DogusChatModal = function () {
    var _this = this;
    _this.serverOptions = {
        httpContext: "http",
        host: "www.dogusatasoy.com:2428",
        auth: btoa("dgsschatclient"),
        routes: { sendMessage: "send", getMessages: "list", pushMessage: "pushws" }
    };

    _this.onMessageReceived = function () {
    };

    this.openWebSocket = function () {
        _this.serverSocket = new WebSocket("ws://{0}/{1}".substitute(_this.serverOptions.host, _this.serverOptions.routes.pushMessage));
        _this.serverSocket.onmessage = function (e) {
            try {
                var _data = JSON.parse(e.data);
                if (_data.channel == (window.location.hash.trim() != "" ? window.location.hash : "#general")) {
                    _this.onMessageReceived(_data);
                }
            }
            catch (err) {
                console.log("message parse error");
            }
        }
    };

    _this.sendMessage = function (msg, onMessageSent, onMessageFail) {
        var path = "{0}://{1}/{2}".substitute(_this.serverOptions.httpContext, _this.serverOptions.host, _this.serverOptions.routes.sendMessage);
        var methodType = "POST";
        var data = msg;
        data["channel"] = window.location.hash.trim() != "" ? window.location.hash : "#general";

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function (a) {
            if (xmlhttp.readyState === 4) {
                var responseData = "";
                if (xmlhttp.status === 200) {
                    if (onMessageSent) {
                        onMessageSent(JSON.parse(xmlhttp.responseText));
                    }
                }
                else {
                    console.log("Message Sent Error %o", xmlhttp.responseText);
                    if (onMessageFail) {
                        onMessageFail(xmlhttp.responseText);
                    }
                }
            }
        };

        xmlhttp.open(methodType, path, true);
        xmlhttp.setRequestHeader('Content-type', 'application/json');
        xmlhttp.setRequestHeader('Authorization', 'Basic ' + _this.serverOptions.auth);
        xmlhttp.send(JSON.stringify(data));
    };

    _this.getMessages = function (onComplete, onFail) {
        var path = "{0}://{1}/{2}".substitute(_this.serverOptions.httpContext, _this.serverOptions.host, _this.serverOptions.routes.getMessages);
        var methodType = "POST";

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function (a) {
            if (xmlhttp.readyState === 4) {
                var responseData = "";
                if (xmlhttp.status === 200) {
                    onComplete(JSON.parse(xmlhttp.responseText));
                    if (!_this.serverSocket) {
                        _this.openWebSocket();
                    }
                }
                else {
                    onFail(xmlhttp.responseText);
                }
            }
        };

        xmlhttp.open(methodType, path, true);
        xmlhttp.setRequestHeader('Content-type', 'application/json');
        xmlhttp.setRequestHeader('Authorization', 'Basic ' + _this.serverOptions.auth);
        xmlhttp.send(JSON.stringify({ channel: window.location.hash.trim() != "" ? window.location.hash : "#general" }));
    };
};