define (require, exports, module) ->
    "use strict"

    index = {}

    # index.TweenLite = require("TweenLite")
    # index.TweenMax = require("TweenMax")
    SplitText = index.SplitText = require("asset/gsap/utils/SplitText")

    index.init = ->
        HeadingSplit = new SplitText("#heading", {type:"words, chars"})
        IntroSplit = new SplitText(".intro", type: "words")
        $("#heading").show()
        $(".intro").show()
        TweenMax.staggerFrom IntroSplit.words, 1, {
            opacity: 0
            scale: 0
            y: 80
            rotationX: 90
            transformOrigin: "0 50% -50"
            ease: Back.easeOut
        }, 0.1, -> IntroSplit.revert()
        TweenMax.staggerFrom HeadingSplit.chars, 2, {
            opacity: 0
            scale: 0
            y: 80
            rotationX: 180
            transformOrigin: "0% 50% -50"
            ease: Back.easeOut
        }, 0.01, -> HeadingSplit.revert()




    module.exports = index