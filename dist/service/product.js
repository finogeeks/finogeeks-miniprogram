'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reserveProduct = exports.getAllProductType = exports.getProductDetail = exports.getProductList = undefined;

var _httpClient = require('../utils/http-client.js');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * 获取产品列表信息
 * @param page
 * @param size
 * @param type
 * @returns {AxiosPromise}
 */
var getProductList = exports.getProductList = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type, page, size, staffId, shareId, shareViewName) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/adviserZone/product/list/manage',
              method: 'GET',
              data: {
                status: 1,
                type: type,
                page: page,
                size: size,
                staffId: staffId,
                shareId: shareId,
                shareViewName: shareViewName
              }
            });

          case 2:
            response = _context.sent;
            return _context.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getProductList(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * 获取产品详情
 * @param productId
 * @returns {AxiosPromise}
 */
var getProductDetail = exports.getProductDetail = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(productId, staffId) {
    var response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/adviserZone/product/' + productId + '?staffId=' + staffId,
              method: 'GET'
            });

          case 2:
            response = _context2.sent;
            return _context2.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getProductDetail(_x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * 获取所有产品类型
 * @param productId
 * @returns {AxiosPromise}
 */
var getAllProductType = exports.getAllProductType = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/adviserZone/product/types',
              method: 'GET',
              data: { adviserId: '' }
            });

          case 2:
            response = _context3.sent;
            return _context3.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getAllProductType() {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * 预约产品
 * @param productId
 * @returns {AxiosPromise}
 */
var reserveProduct = exports.reserveProduct = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref4) {
    var productId = _ref4.productId,
        staffId = _ref4.staffId,
        name = _ref4.name,
        mobile = _ref4.mobile,
        city = _ref4.city,
        company = _ref4.company,
        annualIncome = _ref4.annualIncome;
    var response;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _httpClient.request)({
              url: '/api/v1/adviserZone/sales/booking',
              method: 'POST',
              data: {
                productId: productId,
                staffId: staffId,
                name: name,
                mobile: mobile,
                city: city,
                company: company,
                annualIncome: annualIncome
              }
            });

          case 2:
            response = _context4.sent;
            return _context4.abrupt('return', response.data);

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function reserveProduct(_x9) {
    return _ref5.apply(this, arguments);
  };
}();