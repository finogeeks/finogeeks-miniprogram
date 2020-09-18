"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _index = require("../../../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SuggestBox = function (_BaseComponent) {
  _inherits(SuggestBox, _BaseComponent);

  function SuggestBox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SuggestBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SuggestBox.__proto__ || Object.getPrototypeOf(SuggestBox)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["data", "suggests"], _this.handleSelect = function (text) {
      _this.props.onSelect && _this.props.onSelect(text);
    }, _this.getData = function () {
      var suggests = _this.props.suggests;
      var result = suggests.result,
          keyword = suggests.keyword;


      return result.map(function (line) {
        var keys = line.standardQuestion.split(keyword);
        var nodes = keys.reduce(function (total, current, index) {
          if (index === 0 && line.standardQuestion.startsWith(keyword)) {
            return total.concat({ value: keyword, type: 'highlight' });
          }
          if (current) {
            var l = [{ value: current, type: 'normal' }];
            if (index !== keys.length - 1) {
              l.push({ value: keyword, type: 'highlight' });
            }
            return total.concat(l);
          }
          return total;
        }, []);
        return {
          nodes: nodes,
          text: line.standardQuestion
        };
      });
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SuggestBox, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(SuggestBox.prototype.__proto__ || Object.getPrototypeOf(SuggestBox.prototype), "_constructor", this).call(this, props);
      this.state = {};
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

      var data = this.getData();
      Object.assign(this.__state, {
        data: data
      });
      return this.__state;
    }
  }]);

  return SuggestBox;
}(_index.Component);

SuggestBox.$$events = ["handleSelect"];
SuggestBox.$$componentPath = "pages/room/components/suggest-box/index";


SuggestBox.defaultProps = {
  suggests: {
    keyword: '',
    result: []
  },
  keyword: '',
  onSelect: function onSelect() {}
};

exports.default = SuggestBox;

Component(require('../../../../npm/@tarojs/taro-weapp/index.js').default.createComponent(SuggestBox));