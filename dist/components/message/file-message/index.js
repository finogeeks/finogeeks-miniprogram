'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require('../../../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FILE_TYPES = {
  '': 'other',

  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'docx',

  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xlsx',

  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/vnd.ms-powerpoint': 'pptx',

  'application/pdf': 'pdf',

  'text/plain': 'other'
};

var FileMessage = function (_BaseComponent) {
  _inherits(FileMessage, _BaseComponent);

  function FileMessage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FileMessage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileMessage.__proto__ || Object.getPrototypeOf(FileMessage)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["_$anonymousState__temp", "message", "fileType"], _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FileMessage, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(FileMessage.prototype.__proto__ || Object.getPrototypeOf(FileMessage.prototype), '_constructor', this).call(this, props);

      this.$$refs = [];
    }
  }, {
    key: 'getFileType',
    value: function getFileType(mime) {
      if (mime in FILE_TYPES) {
        return FILE_TYPES[mime];
      }
      return 'other';
    }
  }, {
    key: 'getFileSize',
    value: function getFileSize() {
      var message = this.props.message;


      var size = message.content.info.size;
      if (typeof size != 'number') {
        return '';
      }var label = void 0;
      if (size > 1099511627776) {
        label = (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + 'T';
      } else if (size > 1073741824) {
        label = (size / 1024 / 1024 / 1024).toFixed(2) + 'G';
      } else if (size > 1048576) {
        label = (size / 1024 / 1024).toFixed(2) + 'M';
      } else if (size > 1024) {
        label = Math.floor(size / 1024) + 'K';
      } else {
        label = size + 'B';
      }
      return label;
    }
  }, {
    key: 'handleOpenFile',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var message, url, fileType, res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                message = this.props.message;
                url = message.content.url;
                fileType = this.getFileType(message.content.info.mimetype || '');

                if (!(fileType === 'other')) {
                  _context.next = 6;
                  break;
                }

                _index2.default.showToast({
                  title: '小程序暂不支持该文件类型',
                  icon: 'none',
                  mask: true
                });
                return _context.abrupt('return');

              case 6:
                _context.next = 8;
                return _index2.default.downloadFile({ url: url });

              case 8:
                res = _context.sent;
                _context.next = 11;
                return _index2.default.openDocument({ filePath: res.tempFilePath });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleOpenFile() {
        return _ref2.apply(this, arguments);
      }

      return handleOpenFile;
    }()
  }, {
    key: '_createData',
    value: function _createData() {
      var _$anonymousState__temp;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var message = this.__props.message;

      if (!message || !message.content || !message.content.info) {
        return null;
      }
      var fileType = this.getFileType(message.content.info.mimetype || '');
      console.log(message.content.flag);
      if (!message.content.flag) {
        _$anonymousState__temp = this.getFileSize();
      }
      Object.assign(this.__state, {
        _$anonymousState__temp: _$anonymousState__temp,
        message: message,
        fileType: fileType
      });
      return this.__state;
    }
  }]);

  return FileMessage;
}(_index.Component);

FileMessage.$$events = ["handleOpenFile"];
FileMessage.$$componentPath = "components/message/file-message/index";
exports.default = FileMessage;

Component(require('../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(FileMessage));