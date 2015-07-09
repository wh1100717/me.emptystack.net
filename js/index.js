(function() {
  define(function(require, exports, module) {
    "use strict";
    var firstPage, index;
    firstPage = require("./module/firstPage");
    index = {};
    index.init = function() {
      return firstPage.init();
    };
    return module.exports = index;
  });

}).call(this);
