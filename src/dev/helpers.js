HTMLElement.prototype.addClass = function(className) {
  var currentClasses = this.className.split(" ");
  if (currentClasses.length == 1 && currentClasses[0].trim() == "") {
    this.className = className;
  } else if (currentClasses.indexOf(className) == -1) {
    this.className += " " + className;
  }
}

HTMLElement.prototype.removeClass = function(className) {
  var currentClasses = this.className.split(" ");
  if (currentClasses.length == 1 && currentClasses[0].trim() == className) {
    this.removeAttribute("class");
  } else if (currentClasses.indexOf(className) != -1) {
    var newClassName = "";
    for (var i = 0; i < currentClasses.length; i++) {
      if (currentClasses[i] != className) {
        newClassName += " " + currentClasses[i];
      }
    }
    this.className = newClassName.replace(/ /gi, "");
  }
}

HTMLElement.prototype.hasClass = function(className) {
  return (typeof this.className == "string" && this.className.split(" ").indexOf(className) != -1);
}

HTMLElement.prototype.remove = function() {
  this.parentNode.removeChild(this);
}

HTMLElement.prototype.empty = function() {
  while (this.childNodes.length > 0) {
    this.removeChild(this.childNodes[0]);
  }
}

document.createDomElement = function(domOpt) {
  var _dom = document.createElement(domOpt.nodeType);

  if (domOpt.className) {
    if (typeof domOpt.className == "string") {
      _dom.addClass(domOpt.className);
    } else if (typeof domOpt.className == "object") {
      for (var key in domOpt.className) {
        _dom.addClass(domOpt.className[key]);
      }
    }
  }

  if (domOpt.id) {
    _dom.setAttribute("id", domOpt.id);
  }

  if (typeof domOpt.attributes != "undefined") {
    for (var key in domOpt.attributes) {
      _dom.setAttribute(key, domOpt.attributes[key]);
    }
  }

  if (domOpt.htmlContent != null || domOpt.htmlContent != undefined) {
    _dom.innerHTML = domOpt.htmlContent.toString();
  }
  return _dom;
}

window.qs = HTMLElement.prototype.qs = function(selectorString) {
  if (this === window) {
    return document.querySelectorAll(selectorString);
  } else if (this !== undefined) {
    return this.querySelectorAll(selectorString);
  }
}

window.guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

HTMLElement.prototype.isDomElement = true;
Element.prototype.isDomElement = true;
String.prototype.substitute = function() {
  var _this = this;
  for (var i = 0; i < arguments.length; i++) {
    _this = _this.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i].toString());
  }
  return _this;
}