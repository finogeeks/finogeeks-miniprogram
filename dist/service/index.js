"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _common = require("./common.js");

var common = _interopRequireWildcard(_common);

var _adviser = require("./adviser.js");

var adviser = _interopRequireWildcard(_adviser);

var _product = require("./product.js");

var product = _interopRequireWildcard(_product);

var _report = require("./report.js");

var report = _interopRequireWildcard(_report);

var _user = require("./user.js");

var user = _interopRequireWildcard(_user);

var _detect = require("./detect.js");

var detect = _interopRequireWildcard(_detect);

var _httpClient = require("../utils/http-client.js");

var _httpClient2 = _interopRequireDefault(_httpClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
  function Service() {
    _classCallCheck(this, Service);

    this.common = common;
    this.adviser = adviser;
    this.product = product;
    this.report = report;
    this.user = user;
    this.detect = detect;
    this.isAuth = false;
  }

  _createClass(Service, [{
    key: "setAuth",
    value: function setAuth(config) {
      _httpClient2.default.setAuth(config);
      this.isAuth = true;
    }
  }]);

  return Service;
}();

var service = new Service();
exports.default = service;