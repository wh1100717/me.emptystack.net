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
            build: [
                'css'
                'js'
                'asset'
                '*.html'
            ]
            tmp: ['.tmp']
        coffee:
            compile:
                expand: true
                cwd: 'src/coffee'
                src: ['**/*.coffee']
                dest: '.tmp/build/js/'
                ext: '.js'
        stylus:
            options:
                compress: false
            serve:
                files:
                    '.tmp/build/css/index.css': 'src/styl/index.styl'
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
                    cwd: "src/jade/"
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
                    cwd: "src/jade/"
                    src: ["*.jade"]
                    dest: "./"
                    ext: ".html"
                }]
        copy:
            build:
                expand: true
                cwd: ".tmp/build/"
                src: ["*/**"]
                dest: "./"
            asset:
                expand: true
                cwd: "src/"
                src: ["asset/**/*"]
                dest: "./"
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
            coffee:
                files: 'src/coffee/**/*'
                tasks: ['coffee']
            jade:
                files: 'src/jade/**/*'
                tasks: ['jade:serve']
            stylus:
                files: 'src/styl/**/*.styl'
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
                        'css/*.css'
                        'js/**/*.js'
                    ]
    }

    grunt.registerTask 'serve', [
        'clean:tmp'
        'coffee'
        'stylus'
        'postcss:serve'
        'jade:serve'
        'connect:livereload'
        'watch'
    ]
    grunt.registerTask 'build', [
        'clean'
        'coffee'
        'stylus'
        'postcss:build'
        'jade:build'
        'copy'
    ]
    grunt.registerTask 'server', ['serve']
    grunt.registerTask 'default', ['serve']