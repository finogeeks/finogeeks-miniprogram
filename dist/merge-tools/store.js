"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// import { setCacheSync, getCacheSync, removeCacheSync } from './utils/local-store';


var _index = require("../npm/fbemitter/index.js");

var _type = require("./utils/type.js");

var _isEqual = require("./utils/is-equal.js");

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventBus = new _index.EventEmitter();

var CombineStore = function () {
  function CombineStore(template) {
    _classCallCheck(this, CombineStore);

    this.state = {};
    this.__init(template);
  }

  _createClass(CombineStore, [{
    key: "__init",
    value: function __init(template) {
      var _this = this;

      if (!(0, _type.isObject)(template)) {
        throw new Error('模板格式不正确');
      }
      Object.entries(template).forEach(function (item) {
        var _item = _slicedToArray(item, 2),
            key = _item[0],
            val = _item[1];

        var value = val;
        Object.defineProperty(_this.state, key, {
          get: function get() {
            return value;
          },
          set: function set(newVal) {
            if ((0, _isEqual2.default)(value, newVal)) {
              console.log('commit save Value');
            }
            var oldVal = value;
            value = newVal;
            console.log("EMIT: $combie-store-" + key, newVal);
            eventBus.emit("$combie-store-" + key, newVal, oldVal);
          }
        });
      });
    }
    /**
     * 更新 state
     * @param {string} key 
     * @param {*} value 
     */

  }, {
    key: "commit",
    value: function commit(key, value) {
      if (!this.state[key]) {
        throw new Error("\u3010" + key + "\u3011\u672A\u5728\u6A21\u677F\u4E2D\u5B9A\u4E49\uFF0C\u8BF7\u5148\u5728\u6A21\u677F\u4E2D\u5B9A\u4EE5\u540E\u4F7F\u7528");
      }
      this.state[key] = value;
    }

    /**
     * 订阅 state 变化
     * @param {string} key 
     * @param {function} cb 
     * @return {object} token: token.remove()
     */

  }, {
    key: "subscribe",
    value: function subscribe(key, cb) {
      return eventBus.addListener("$combie-store-" + key, cb);
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }]);

  return CombineStore;
}();

// const cStore = new CombineStore()

exports.default = CombineStore;