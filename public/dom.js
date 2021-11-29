//manipulação de elementos
(function (win, doc) {
  "use strict";

  function DOM(elements) {
    if (!(this instanceof DOM)) {
      return new DOM(elements);
    }

    this.element = doc.querySelectorAll(elements);
  }

  DOM.prototype.on = function (eventType, functionCallback) {
    this.element.forEach((element) => {
      element.addEventListener(eventType, functionCallback);
    });
  };

  DOM.prototype.off = function (eventType, functionCallback) {
    this.element.forEach((element) => {
      element.rempveEventListener(eventType, functionCallback);
    });
  };

  DOM.prototype.get = function (index) {
    if (this.element.length === 1 || index === undefined) {
      return this.element[0];
    }

    return this.element[index];
  };

  DOM.is = function is(object) {
    return Object.prototype.toString.call(object);
  };

  DOM.prototype.forEach = function () {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function () {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.isArray = (object) => DOM.is(object) === "[object Array]";

  DOM.isObject = (object) => DOM.is(object) === "[object Object]";

  DOM.isFunction = (object) => DOM.is(object) === "[object Function]";

  DOM.isNumber = (object) => DOM.is(object) === "[object Number]";

  DOM.isBoolean = (object) => DOM.is(object) === "[object Boolean]";

  DOM.isNull = (object) =>
    DOM.is(object) === "[object Null]" ||
    DOM.is(object) === "[object Undefined]";

  win.DOM = DOM;
})(window, document);
