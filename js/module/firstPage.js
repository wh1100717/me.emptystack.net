(function() {
  define(function(require, exports, module) {
    "use strict";
    var Experience, Skill, SplitText, TweenMax, firstPage;
    TweenMax = require("TweenMax");
    SplitText = require("SplitText");
    Experience = require("./experience");
    Skill = require("../../asset/skill.js");
    console.log(Skill);
    firstPage = {
      init: function() {
        $("body").scrollTop(0);
        this.fp = $("#first-page");
        this.fp.height($(window).height());
        this.animation();
        return this.event_bind();
      },
      event_bind: function() {
        var old_scroll;
        $(window).resize((function(_this) {
          return function() {
            return _this.fp.height($(window).height());
          };
        })(this));
        this.sl.mouseenter((function(_this) {
          return function() {
            return _this.scrollLabel.pause();
          };
        })(this));
        this.sl.mouseout((function(_this) {
          return function() {
            return _this.scrollLabel.resume();
          };
        })(this));
        this.isScrolling = false;
        this.sl.click((function(_this) {
          return function() {
            return _this.scroll_down();
          };
        })(this));
        old_scroll = $(window).scrollTop();
        return $(window).scroll((function(_this) {
          return function() {
            var new_scroll;
            new_scroll = $(window).scrollTop();
            if (new_scroll - old_scroll <= 0) {
              old_scroll = new_scroll;
              return;
            }
            if (old_scroll !== 0) {
              old_scroll = new_scroll;
              return;
            }
            old_scroll = new_scroll;
            return _this.scroll_down();
          };
        })(this));
      },
      scroll_down: function() {
        var self;
        if (this.isScrolling) {
          return;
        }
        this.isScrolling = true;
        self = this;
        return $("body").animate({
          scrollTop: $(window).height()
        }, 1000, function() {
          self.isScrolling = false;
          if ($(".experience-wrap").attr("init") === "false") {
            $(".experience-wrap").attr("init", "true");
            Experience.init();
            Skill.init();
            return $(".skillsList li").hover(function() {
              var e;
              e = "arc-" + $(this).text().toLowerCase();
              return $("#" + e).trigger("mouseover");
            }, function() {
              var e;
              e = "arc-" + $(this).text().toLowerCase();
              return $("#" + e).trigger("mouseout");
            });
          }
        });
      },
      animation: function() {
        var content, contentSplit, heading, headingSplit;
        heading = this.fp.find(".heading");
        content = this.fp.find(".content p");
        headingSplit = new SplitText(heading, {
          type: "words, chars"
        });
        contentSplit = new SplitText(content, {
          type: "words, chars"
        });
        heading.show();
        this.fp.find(".content").show();
        TweenMax.staggerFrom(headingSplit.chars, 2, {
          opacity: 0,
          scale: 0,
          y: 80,
          rotationX: 180,
          transformOrigin: "0% 50% -50",
          ease: Back.easeOut
        }, 0.01, function() {
          return headingSplit.revert();
        });
        TweenMax.staggerFrom(contentSplit.chars, 1, {
          opacity: 0,
          scale: 0,
          y: 80,
          rotationX: 90,
          transformOrigin: "0 50% -50",
          ease: Back.easeOut
        }, 0.2, function() {
          return contentSplit.revert();
        });
        this.sl = this.fp.find(".scroll-label");
        this.sl.show();
        this.scrollLabel = TweenMax.fromTo(this.sl, 1, {
          opacity: 0,
          scale: 0,
          y: -40
        }, {
          opacity: 0.8,
          scale: 1,
          y: 0,
          delay: 0.5
        });
        return this.scrollLabel.repeat(-1).repeatDelay(0.5).play();
      }
    };
    return module.exports = firstPage;
  });

}).call(this);
