define (require, exports, module) ->
    "use strict"

    firstPage = require("./module/firstPage")

    index = {}

    index.init = ->
        firstPage.init()

    module.exports = index