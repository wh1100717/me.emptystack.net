require.config {
    paths: {
        TweenLite: 'asset/gsap/TweenLite'
        TweenMax: 'asset/gsap/TweenMax'
        TimelineMax: 'asset/gsap/TimelineMax'
        SplitText: 'asset/gsap/utils/SplitText'
    }
    shim: {
        TweenLite: {exports: "TweenLite"}
        TweenMax: {exports: "TweenMax"}
        TimelineMax: {exports: "TimelineMax"}
    }
}