define(function(require, module, exports) {
    "use strict";

    var Raphael = require("Raphael")

    var Skill = {};
    Skill.init = function(){
        function o(e, t) {
            t.node["on" + e] = function() {
                for (var n = 0,
                r = t.events.length; n < r; n++) t.events[n].name == e && t.events[n].f.call(t)
            }
        }
        function l() {
            var t = {
                fill: "#228fbd",
                stroke: "none",
                transform: "t615 180"
            },
            n = e.path("M86.112,80.5 86.892,81.191 87.847,80.774 88.374,81.673 89.411,81.572 89.635,82.589 90.653,82.813 90.551,83.851 91.45,84.378 91.033,85.333 91.725,86.112 91.033,86.892 91.45,87.847 90.551,88.374 90.653,89.411 89.635,89.635 89.411,90.653 88.374,90.551 87.847,91.45 86.892,91.033 86.112,91.725 85.333,91.033 84.378,91.45 83.851,90.551 82.813,90.653 82.589,89.635 81.572,89.411 81.673,88.374 80.774,87.847 81.191,86.892 80.5,86.112 81.191,85.333 80.774,84.378 81.673,83.851 81.572,82.813 82.589,82.589 82.813,81.572 83.851,81.673 84.378,80.774 85.333,81.191 z").attr(t).animate({
                path: "M86.112,0 98.071,10.609 112.723,4.214 120.818,18 136.728,16.446 140.167,32.057 155.778,35.497 154.224,51.406 168.011,59.501 161.616,74.154 172.225,86.112 161.616,98.071 168.011,112.723 154.224,120.818 155.778,136.728 140.167,140.167 136.728,155.778 120.818,154.224 112.723,168.011 98.071,161.616 86.112,172.225 74.154,161.616 59.501,168.011 51.406,154.224 35.497,155.778 32.057,140.167 16.446,136.728 18,120.818 4.214,112.723 10.609,98.071 0,86.112 10.609,74.154 4.214,59.501 18,51.406 16.446,35.497 32.057,32.057 35.497,16.446 51.406,18 59.501,4.214 74.154,10.609 z"
            },
            2e3, "bounce").hover(function() {
                this.animate({
                    fill: "#005687",
                    path: "M86.112,-16 100.293,-3.42 117.667,-11.003 127.267,5.345 146.132,3.502 150.211,22.014 168.723,26.093 166.879,44.958 183.228,54.557 175.645,71.932 188.225,86.112 175.645,100.293 183.228,117.667 166.879,127.267 168.723,146.132 150.211,150.211 146.132,168.723 127.267,166.879 117.667,183.228 100.293,175.645 86.112,188.225 71.932,175.645 54.557,183.228 44.958,166.879 26.093,168.723 22.014,150.211 3.502,146.132 5.345,127.267 -11.003,117.667 -3.42,100.293 -16,86.112 -3.42,71.932 -11.003,54.557 5.345,44.958 3.502,26.093 22.014,22.014 26.093,3.502 44.958,5.345 54.557,-11.003 71.932,-3.42"
                },
                1e3, "bounce")
            },
            function() {
                this.animate({
                    fill: "#228fbd",
                    path: "M86.112,0 98.071,10.609 112.723,4.214 120.818,18 136.728,16.446 140.167,32.057 155.778,35.497 154.224,51.406 168.011,59.501 161.616,74.154 172.225,86.112 161.616,98.071 168.011,112.723 154.224,120.818 155.778,136.728 140.167,140.167 136.728,155.778 120.818,154.224 112.723,168.011 98.071,161.616 86.112,172.225 74.154,161.616 59.501,168.011 51.406,154.224 35.497,155.778 32.057,140.167 16.446,136.728 18,120.818 4.214,112.723 10.609,98.071 0,86.112 10.609,74.154 4.214,59.501 18,51.406 16.446,35.497 32.057,32.057 35.497,16.446 51.406,18 59.501,4.214 74.154,10.609 z"
                },
                1e3, "bounce")
            });
            f.push(n),
            setTimeout(function() {
                var t = e.text(703, 250, "{ Empty }\nStacker").attr({
                    "font-size": 22,
                    fill: "#fff",
                    "font-family": s
                });
                f.push(t)
            },
            1e3)
        }
        var e = Raphael("skillChart", 830, 500),
        t = 73,
        n = "Skills",
        r = 250;
        e.circle(250, 250, 5).attr({
            stroke: "none",
            fill: "#193340"
        }).animate({
            r: 85
        },
        1e3, ">");
        var i = e.text(250, 250, n).attr({
            font: "20px Hiragino Sans GB, Microsoft YaHei, sans-serif",
            fill: "#fff"
        }).toFront(),
        s = "Hiragino Sans GB, Microsoft YaHei, sans-serif";
        e.customAttributes.arc = function(e, t, n) {
            var r = 3.6 * e,
            i = r == 360 ? 359.99 : r,
            s = (90 - i) * Math.PI / 180,
            o = 250 + n * Math.cos(s),
            u = 250 - n * Math.sin(s),
            a = [["M", 250, 250 - n], ["A", n, n, 0, +(i > 180), 1, o, u]];
            return {
                path: a,
                stroke: t
            }
        };
        var u = e.circle(702, 20, 5).attr({
            stroke: "none",
            fill: "#228fbd"
        }),
        a = e.path("M 702 20 L 702 20").attr({
            fill: "none",
            stroke: "#228fbd",
            "stroke-width": 1
        }).animate({
            path: "M702 20 L 702 180"
        },
        1e3, ">", l),
        f = e.set();
        f.push(u),
        f.push(a);
        var c = [{
            kind: "Common",
            score: "45",
            color: "#88B8E6"
        },
        {
            kind: "Python",
            score: "65",
            color: "#97BE0D"
        },
        {
            kind: "FE-Basic",
            score: "75",
            color: "#D84F5F"
        },
        {
            kind: "FE-Advanced",
            score: "80",
            color: "#998566"
        }],
        h = e.set(),
        p = {
            "arc-common": [
                [200, "MongoDB"],
                [250, "Reids"],
                [200, "Yoeman/Generator"],
                [300, "Markdown"],
                [250, "Teambition/Trello"]
            ],
            "arc-python": [
                [250, "Tonado"],
                [200, "Web.py"],
                [130, "Autobahn"],
                [300, "Scrapy"],
                [110, "Bottle"]
            ],
            "arc-fe-basic": [
                [300, "Coffeescript"],
                [250, "LESS/Stylus"],
                [200, "Jade"],
                [300, "Bootstrap/Foundation"],
                [150, "Express/Koa"],
                [200, "ES5/6/7"],
                [250, "Grunt/Gulp"],
                [170, "Webpack"]
            ],
            "arc-fe-advanced": [
                [200, "AngularJS"],
                [200, "Polymer 0.5"],
                [150, "React"],
                [250, "Famo.us/TweenMax"],
                [220, "Data Visualization"],
                [200, "Material Design"],
                [180, "Web Security"],
                [220, "Karma/Jasmine"],
                [210, "Leancloud/Firebase"]
            ]
        },
        d = 30,
        v = 550,
        m = 150,
        g = v + 10;
        setTimeout(function() {
            for (var u = 0; u < c.length; u++) {
                var a = c[u],
                l = a.color,
                y = a.score,
                b = a.kind,
                w = "arc-" + b.toLowerCase().replace("&", "_");
                t += 30;
                var E = e.path().attr({
                    arc: [y, l, t],
                    "stroke-width": 26
                });
                E.node.id = w,
                function(t, u, a) {
                    o("mouseover", E),
                    o("mouseout", E),
                    E.mouseover(function() {
                        this.animate({
                            "stroke-width": 50,
                            opacity: .75
                        },
                        1e3, "elastic"),
                        Raphael.type != "VML" && this.toFront(),
                        i.stop().animate({
                            opacity: 0
                        },
                        r, ">",
                        function() {
                            this.attr({
                                text: a + "\n" + u + "%"
                            }).animate({
                                opacity: 1
                            },
                            r, "<")
                        });
                        var n = this.node.id;
                        for (var o = 0,
                        l = p[n]; o < l.length; o++) {
                            var c = d + 10,
                            y = e.rect(v, m + c * o, 1, d).attr({
                                fill: t,
                                stroke: "none"
                            }).animate({
                                width: l[o][0]
                            },
                            2e3 * Math.random(), "bounce"),
                            b = e.text(g, c * o + m + d / 2, l[o][1]).attr({
                                "font-size": 20,
                                fill: "#fff",
                                "font-family": s,
                                "text-anchor": "start"
                            });
                            h.push(y),
                            h.push(b)
                        }
                        f.forEach(function(e) {
                            var t = Raphael.animation({
                                opacity: 0
                            },
                            500, ">");
                            e.stop().animate(t)
                        })
                    }).mouseout(function() {
                        this.stop().animate({
                            "stroke-width": 26,
                            opacity: 1
                        },
                        r * 4, "elastic"),
                        i.stop().animate({
                            opacity: 0
                        },
                        r, ">",
                        function() {
                            i.attr({
                                text: n
                            }).animate({
                                opacity: 1
                            },
                            r, "<")
                        }),
                        console.log(h.length),
                        h.length > 0 && (h.forEach(function(e) {
                            e.remove()
                        }), h.clear()),
                        f.forEach(function(e) {
                            var t = Raphael.animation({
                                opacity: 1
                            },
                            1e3, ">");
                            e.stop().animate(t)
                        })
                    })
                } (l, y, b)
            }
        },
        1500)
    }

    return Skill;
});
