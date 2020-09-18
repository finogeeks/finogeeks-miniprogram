"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolBox = function (_BaseComponent) {
  _inherits(ToolBox, _BaseComponent);

  function ToolBox() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, ToolBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToolBox.__proto__ || Object.getPrototypeOf(ToolBox)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "roomType", "height"], _this.handleChooseImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var res, tempFiles;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('choose image');
              _context.next = 3;
              return _index2.default.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album']
              });

            case 3:
              res = _context.sent;
              tempFiles = res.tempFiles;
              // await this.handleImage(tempFiles)

              _this.props.onAction({ type: 'image', content: tempFiles });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })), _this.handleTakePhoto = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var res, tempFiles;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('take photo');
              _context2.next = 3;
              return _index2.default.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['camera']
              });

            case 3:
              res = _context2.sent;
              tempFiles = res.tempFiles;
              // await this.handleImage(tempFiles)

              _this.props.onAction({ type: 'image', content: tempFiles });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _this.handleChooseFile = function () {}, _this.handleLeaveMessage = function () {
      _this.props.onAction && _this.props.onAction({ type: 'leave-message' });
    }, _this.handleChooseLocation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.props.onAction({ type: 'location' });

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    })), _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToolBox, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(ToolBox.prototype.__proto__ || Object.getPrototypeOf(ToolBox.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _props = this.__props,
          roomType = _props.roomType,
          height = _props.height;

      var anonymousState__temp = (0, _index.internal_inline_style)({ height: height + "rpx" });
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        roomType: roomType
      });
      return this.__state;
    }
  }]);

  return ToolBox;
}(_index.Component);

ToolBox.$$events = ["handleChooseImage", "handleTakePhoto", "handleLeaveMessage", "handleChooseLocation"];
ToolBox.$$componentPath = "pages/room/components/tool-box/index";


ToolBox.defaultProps = {
  roomId: '',
  roomType: '',
  orderId: '',
  dispatchInfo: {},
  onAction: function onAction() {},
  height: 0
};

exports.default = ToolBox;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(ToolBox));