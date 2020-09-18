"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import eventCenter from '@/utils/events';


var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _isEqual = require("../../utils/lodash-local/is-equal.js");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _store = require("../interface/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseStore = function () {
  function BaseStore(name) {
    var _this = this;

    _classCallCheck(this, BaseStore);

    this.store = {};
    this.eventCenter = new _index.Events();
    this.updateEventName = '';
    // private eventQueue: StoreUpdateEvent<T>[] = [];
    this.oprationMap = {};
    this.pushOpration = function (action, params) {
      _this.oprationMap[params.id] = {
        type: action,
        params: params
      };
      if (_this.emitTimer) {
        clearTimeout(_this.emitTimer);
      }
      // 模拟debounce 50
      _this.emitTimer = setTimeout(function () {
        _this.processOprationQueue();
      }, 50);
      return true;
    };
    this.processOprationQueue = function () {
      Object.values(_this.oprationMap).forEach(function (op) {
        _this.opration(op.type, op.params);
      });
      _this.oprationMap = {};
    };
    this.updateEventName = "STORE_" + name + "_UPDATE";
  }

  _createClass(BaseStore, [{
    key: "add",
    value: function add(id, item) {
      return this.pushOpration(_store.Action.ADD, { id: id, item: item });
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      return this.pushOpration(_store.Action.DELETE, { id: id });
    }
  }, {
    key: "update",
    value: function update(id, item) {
      return this.pushOpration(_store.Action.UPDATE, { id: id, item: item });
    }
  }, {
    key: "put",
    value: function put(id, item) {
      return this.pushOpration(_store.Action.PUT, { id: id, item: item });
    }
  }, {
    key: "get",
    value: function get(id) {
      if (!this.store[id]) return null;
      return this.store[id];
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return Object.values(this.store);
    }
  }, {
    key: "opration",
    value: function opration(action, params) {
      var id = params.id,
          item = params.item;

      var actionRes = false;
      var originItem = this.store[id];
      switch (action) {
        case _store.Action.ADD:
          if (!this.store[id]) break;
          this.store[id] = item;
          actionRes = true;
          break;
        case _store.Action.UPDATE:
          if (!this.store[id]) break;
          if ((0, _isEqual2.default)(this.store[id], item)) break;
          this.store[id] = item;
          actionRes = true;
          break;
        case _store.Action.PUT:
          if ((0, _isEqual2.default)(this.store[id], item)) break;
          this.store[id] = item;
          actionRes = true;
          break;
        case _store.Action.DELETE:
          if (!this.store[id]) break;
          delete this.store[id];
          actionRes = true;
          break;
      }
      if (actionRes) {
        var event = {
          type: action,
          id: id,
          item: item,
          prevItem: originItem
        };
        this.beforeEmitUpdate(event);
        // this.pushEventToQueue(event);
        this.eventCenter.trigger(this.updateEventName, event);
      }
      return actionRes;
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(callBack) {
      this.eventCenter.on(this.updateEventName, callBack);
    }
  }, {
    key: "offUpdate",
    value: function offUpdate(callBack) {
      this.eventCenter.off(this.updateEventName, callBack);
    }
  }]);

  return BaseStore;
}();

exports.default = BaseStore;