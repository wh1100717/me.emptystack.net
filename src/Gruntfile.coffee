module.exports = (grunt) ->
    'use strict'

    require('load-grunt-tasks')(grunt)
    
    grunt.initConfig {
        pkg: grunt.file.readJSON 'package.json'
        banner: """

        /**
         * <%= pkg.name %>
         * Version: <%= pkg.version %>
         * Copyright 2015 - <%= grunt.template.today("yyyy") %> <%= pkg.author %>
         */
        
        """
        clean:
            build: ['build']
            tmp: ['.tmp']
        stylus:
            options:
                compress: false
                paths: ['stylus']
            serve:
                files:
                    '.tmp/build/css/index.css': 'styl/index.styl'
        postcss:
            serve:
                options:
                    map: false
                    processors: [
                        require('pixrem')()
                        # require('autoprefixer')({browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'})
                        require('autoprefixer')({browsers: 'last 2 versions'})
                    ]
                src: ['.tmp/build/css/*.css']
            build:
                options:
                    map: false
                    processors: [
                        require('pixrem')()
                        require('autoprefixer')({browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'})
                        require('cssnano')
                    ]
                src: ['.tmp/build/css/*.css']
        jade:
            serve:
                options:
                    banner: '<%= banner %>'
                    data:
                        debug: true
                        version: '<%= pkg.version %>'
                    # processContent: (content) ->
                    #     content = content.replace(/#{baseurl}/gi, "http://g.tbcdn.cn/forest/dthink/0.0.1")
                    #     return content
                files: [{
                    expand: true
                    cwd: "jade/"
                    src: ["*.jade"]
                    dest: ".tmp/build/"
                    ext: ".html"
                }]
            build:
                options:
                    banner: '<%= banner %>'
                    data:
                        debug: false
                        version: '<%= pkg.version %>'
                files: [{
                    expand: true
                    cwd: "jade/"
                    src: ["*.jade"]
                    dest: "build/"
                    ext: ".html"
                }]
        copy:
            build:
                expand: true
                cwd: ".tmp/build/"
                src: ["*/**"]
                dest: "../"
        connect:
            options:
                port: 9008
                livereload: 42201
                hostname: 'localhost'
                base: '.'
                middleware: (connect, options, middlewares) ->
                    middlewares.unshift (req, res, next) ->
                        console.log req.url
                        res.setHeader('Access-Control-Allow-Origin', '*')
                        res.setHeader('Access-Control-Allow-Methods', '*')
                        return next() if req.url.indexOf(".tmp") isnt -1
                        req.url = "/index.html" if req.url is "/"
                        if req.url.indexOf("http://") isnt -1
                            return next()
                        if req.url.indexOf("asset") isnt -1
                            return next()
                        req.url = "/.tmp/build" + req.url
                        return next()
                    return middlewares
            livereload:
                options:
                    open: true
        watch:
            jade:
                files: 'jade/**/*'
                tasks: ['jade:serve']
            stylus:
                files: 'styl/**/*.styl'
                tasks: ['stylus', 'postcss:serve']
            livereload:
                options:
                    livereload: '<%= connect.options.livereload %>'
                files: [
                    '.tmp/build/{,*/}*.html'
                    '.tmp/build/**/css/{,*/}*.css'
                    '.tmp/build/**/js/{,*/}*.js'
                    '.tmp/build/**/module/**'
                    '.tmp/build/**/img/**'
                ]
        usebanner:
            dist:
                options:
                    position: 'top'
                    banner: '<%= banner %>'
                files:
                    src: [
                        'build/css/*.css'
                    ]
    }

    grunt.registerTask 'serve', [
        'clean:tmp'
        'stylus'
        'postcss:serve'
        'jade:serve'
        'connect:livereload'
        'watch'
    ]
    grunt.registerTask 'build', [
        'clean'
        'stylus'
        'postcss:build'
        'jade:build'
        'copy'
    ]
    grunt.registerTask 'server', ['serve']
    grunt.registerTask 'default', ['serve']