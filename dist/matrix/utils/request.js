"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _httpClient = require("../../utils/http-client.js");

var _store = require("../../utils/store.js");

var _index = require("../../npm/url-parse/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/qs/lib/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var userSession = (0, _store.getCacheSync)('userSession');
var userId = userSession ? userSession.userId : '';
var request = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var basic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var header, postfix, url, urlEntity, keys, newOptions, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // console.log('~~~~~~~~~~~~~~~~~~utils request ~~~~~~~~~~~~~~~~~~~~', opts);
            header = _extends({}, opts.headers, {
              'X-Consumer-Custom-ID': userId
            });
            postfix = _index4.default.stringify(opts.qs || {}, opts.qsStringifyOptions);
            url = opts.uri || opts.url;
            urlEntity = new _index2.default(url, true);
            keys = urlEntity.query && Object.keys(urlEntity.query) || [];

            postfix = "" + (keys.length > 0 ? '&' : '?') + postfix;
            newOptions = {
              url: "" + url + postfix,
              method: opts.method && opts.method.toUpperCase() || 'GET',
              header: header,
              dataType: opts.json ? 'json' : 'text',
              responseType: 'text',
              data: opts.body
            };
            _context.prev = 7;
            _context.next = 10;
            return (0, _httpClient.fetch)(newOptions);

          case 10:
            response = _context.sent;

            callback(null, response, response.data);
            return _context.abrupt("return", response);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](7);

            callback(_context.t0, _context.t0, null);
            return _context.abrupt("return", _context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[7, 15]]);
  }));

  return function request() {
    return _ref.apply(this, arguments);
  };
}();
exports.default = request;