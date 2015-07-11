(function() {
  define(function(require, exports, module) {
    "use strict";
    var Experience, Skill, SplitText, TweenMax, firstPage;
    TweenMax = require("TweenMax");
    SplitText = require("SplitText");
    Experience = require("./experience");
    Skill = require("../../asset/skill.js");
    firstPage = {
      init: function() {
        this.fp = $("#first-page");
        this.screenHeight = this.get_screen_height();
        this.reset_height();
        $(document).scrollTop(0);
        this.animation();
        return this.event_bind();
      },
      get_screen_height: function() {
        if ((window.orientation != null) && Math.abs(window.orientation) === 90) {
          return window.innerWidth;
        } else {
          return window.innerHeight;
        }
      },
      reset_height: function() {
        return this.fp.height(this.screenHeight);
      },
      event_bind: function() {
        var old_scroll;
        $(window).resize((function(_this) {
          return function() {
            var newHeight;
            newHeight = _this.get_screen_height();
            if (_this.screenHeight !== newHeight) {
              _this.screenHeight = newHeight;
              return _this.reset_height();
            }
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
        this.sb.mouseenter((function(_this) {
          return function() {
            return _this.scrollBack.pause();
          };
        })(this));
        this.sb.mouseout((function(_this) {
          return function() {
            return _this.scrollBack.resume();
          };
        })(this));
        this.isScrolling = false;
        this.sl.click((function(_this) {
          return function() {
            return _this.scroll_down();
          };
        })(this));
        this.sb.click(function() {
          return $("body").animate({
            scrollTop: 0
          }, 2000);
        });
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
          scrollTop: this.get_screen_height()
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
        this.scrollLabel.repeat(-1).repeatDelay(0.5).play();
        this.sb = $(".scroll-back i");
        this.scrollBack = TweenMax.fromTo(this.sb, 1, {
          opacity: 0,
          scale: 0,
          y: 40
        }, {
          opacity: 0.8,
          scale: 1,
          y: 0
        });
        return this.scrollBack.repeat(-1).repeatDelay(0.5).play();
      }
    };
    return module.exports = firstPage;
  });

}).call(this);
