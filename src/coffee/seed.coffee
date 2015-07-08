require.config {
    paths: {
        TweenLite: 'asset/gsap/TweenLite'
        TweenMax: 'asset/gsap/TweenMax'
    }
    shim: {
        TweenLite: {exports: "TweenLite"}
        TweenMax: {exports: "TweenMax"}
    }
}