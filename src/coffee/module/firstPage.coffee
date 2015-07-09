define (require, exports, module) ->
    "use strict"
    
    TweenMax = require("TweenMax")
    SplitText = require("SplitText")

    firstPage =
        init: ->
            @fp = $("#first-page")
            @fp.height($(window).height)
            @event_bind()
            @animation()
        event_bind: ->
            $(window).resize => @fp.height($(window).height())
        animation: ->
            heading = @fp.find(".heading")
            intro = @fp.find(".intro")
            headingSplit = new SplitText(heading, {type:"words, chars"})
            introSplit = new SplitText(intro, type: "words")
            heading.show()
            intro.show()
            TweenMax.staggerFrom introSplit.words, 1, {
                opacity: 0
                scale: 0
                y: 80
                rotationX: 90
                transformOrigin: "0 50% -50"
                ease: Back.easeOut
            }, 0.1, -> introSplit.revert()
            TweenMax.staggerFrom headingSplit.chars, 2, {
                opacity: 0
                scale: 0
                y: 80
                rotationX: 180
                transformOrigin: "0% 50% -50"
                ease: Back.easeOut
            }, 0.01, -> headingSplit.revert()

    module.exports = firstPage