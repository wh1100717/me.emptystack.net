define (require, exports, module) ->
    "use strict"
    
    TweenMax = require("TweenMax")
    SplitText = require("SplitText")
    secondPage = require("./secondPage")

    firstPage =
        init: ->
            $("body").scrollTop(0)
            @fp = $("#first-page")
            @fp.height($(window).height())
            @animation()
            @event_bind()
        event_bind: ->
            $(window).resize => @fp.height($(window).height())
            @sl.mouseenter => @scrollLabel.pause()
            @sl.mouseout => @scrollLabel.resume()

            @isScrolling = false
            @sl.click =>
                @scroll_down()
            old_scroll = $(window).scrollTop()
            $(window).scroll =>
                new_scroll = $(window).scrollTop()
                if new_scroll - old_scroll <= 0
                    old_scroll = new_scroll
                    return
                if old_scroll isnt 0
                    old_scroll = new_scroll
                    return
                old_scroll = new_scroll
                @scroll_down()
        scroll_down: ->
            return if @isScrolling
            @isScrolling = true
            self = @
            $("body").animate {
                scrollTop: $(window).height()
            }, 1000, ->
                self.isScrolling = false
                if $(".experience-wrap").attr("init") is "false"
                    $(".experience-wrap").attr("init", "true")
                    secondPage.init()

        animation: ->
            heading = @fp.find(".heading")
            content = @fp.find(".content p")
            headingSplit = new SplitText(heading, {type:"words, chars"})
            contentSplit = new SplitText(content, type: "words")
            heading.show()
            @fp.find(".content").show()
            TweenMax.staggerFrom headingSplit.chars, 2, {
                opacity: 0
                scale: 0
                y: 80
                rotationX: 180
                transformOrigin: "0% 50% -50"
                ease: Back.easeOut
            }, 0.01, -> headingSplit.revert()
            TweenMax.staggerFrom contentSplit.words, 1, {
                opacity: 0
                scale: 0
                y: 80
                rotationX: 90
                transformOrigin: "0 50% -50"
                ease: Back.easeOut
            }, 0.1, -> contentSplit.revert()
            @sl = @fp.find(".scroll-label")
            @sl.show()
            @scrollLabel = TweenMax.fromTo @sl, 1.5, {
                opacity: 0
                scale: 0
                y: -40
            }, {
                opacity: 0.8
                scale: 1
                y: 0
                delay: 1.5
            }
            @scrollLabel.repeat(-1).repeatDelay(0.7).play()

    module.exports = firstPage