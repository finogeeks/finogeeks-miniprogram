"use strict";
var replace = String.prototype.replace,
    percentTwenties = /%20/g,
    util = require("./utils.js"),
    Format = { RFC1738: "RFC1738", RFC3986: "RFC3986" };module.exports = util.assign({ default: Format.RFC3986, formatters: { RFC1738: function (e) {
      return replace.call(e, percentTwenties, "+");
    }, RFC3986: function (e) {
      return String(e);
    } } }, Format);