(function() {
  define(function(require, exports, module) {
    "use strict";
    var Experience, Raphael;
    Raphael = require("Raphael");
    Experience = {
      init: function() {
        var animation, cate, category, experience, i, len, pathStyle, results, textStyle, timeline;
        timeline = new Raphael(document.getElementById("experienceTimeLine"), 900, 900);
        experience = [[200, 15, "#97BE0D", "2006.09 - 2010.07，哈尔滨", "哈尔滨工程大学 本科", "计算机科学与技术"], [300, 23, "#97BE0D", "2010.09 - 2011.10，LONDON", "Imperial College", "Msc Advanced Computing"], [400, 20, "#88B8E6", "2011.11 - 2013.04，北京 杭州", "爱狗网", "Java工程师"], [500, 15, "#88B8E6", "2013.05 - 2013.10，哈尔滨", "FancyFruit甜品店", ""], [600, 20, "#88B8E6", "2013.11 - 2014.06，哈尔滨 北京", "宝利明威", "Python工程师"], [700, 24, "#88B8E6", "2014.07 - 2015.07，杭州", "阿里巴巴", "高级前端开发工程师"], [800, 18, "#009688", "2015.07 - 至今，哈尔滨", "家", "避暑待业..."]];
        category = [["#97BE0D", 400, "学习"], ["#88B8E6", 530, "工作经历"]];
        pathStyle = {
          "fill": "none",
          "stroke-dasharray": "- ",
          "stroke": "#ccc",
          "stroke-width": 1
        };
        textStyle = {
          "font-size": 16,
          "fill": "#898989",
          "text-anchor": "start"
        };
        animation = function() {
          var exp, i, len, results;
          timeline.path("M300 130 L 300 130").attr(pathStyle).animate({
            path: "M300 130 L 300 800 l 300 800"
          }, 1e3, "backOut");
          results = [];
          for (i = 0, len = experience.length; i < len; i++) {
            exp = experience[i];
            timeline.circle(300, 1500, exp[1]).attr({
              stroke: "none",
              fill: exp[2]
            }).animate({
              cy: exp[0]
            }, 1e3 + 1e3 * Math.random(), "backOut").hover(function() {
              return this.animate({
                r: exp[1] * 1.5
              }, 500, "bounce");
            }, function() {
              return this.animate({
                r: exp[1]
              }, 500, "bounce");
            });
            timeline.text(360, 1500, exp[3]).attr(textStyle).animate(Raphael.animation({
              y: exp[0]
            }, 1e3, "backOut").delay(1e3));
            timeline.text(360, 1500, exp[4]).attr(textStyle).animate(Raphael.animation({
              y: exp[0] + 25
            }, 1e3, "backOut").delay(1e3));
            results.push(timeline.text(360, 1500, exp[5]).attr(textStyle).animate(Raphael.animation({
              y: exp[0] + 50
            }, 1e3, "backOut").delay(1e3)));
          }
          return results;
        };
        timeline.text(0, 95, "1987年7月，出生").attr(textStyle);
        timeline.path("M 130 95 L 170 95 176 95 182 95 188 95 260 95 300 95 385 95").attr(pathStyle).animate({
          path: "M 130 95 L 170 95 176 88 182 105 188 95 260 95 300 130 385 45"
        }, 1e3, "bounce", animation);
        results = [];
        for (i = 0, len = category.length; i < len; i++) {
          cate = category[i];
          timeline.circle(cate[1], 30, 10).attr({
            stroke: "none",
            fill: cate[0]
          });
          results.push(timeline.text(cate[1] + 25, 30, cate[2]).attr(textStyle));
        }
        return results;
      }
    };
    return module.exports = Experience;
  });

}).call(this);
