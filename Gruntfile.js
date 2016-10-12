/**
 * Created by dalia on 09/09/16.
 */
/**
 * Created by dalia on 08/09/16.
 */
// Generated on 2015-04-08 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        base: '.',
        dist: 'dist',
        generator: {
            base: 'ceres-generator/generators/app/templates/',
            app:  'ceres-generator/generators/app/templates/app',
            ceres:'ceres-generator/generators/app/templates/app/ceres'
        }
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,
        mypackage: require('./package.json'),

        ngconstant: {
            options: {
                name: '<%= mypackage.name %>',
                dest: '<%= yeoman.app %>/configuration.js',
                deps: false,
                constants: {
                    configuration: {
                        apiUrl: 'http://127.0.0.1:5000/server/api',
                        inTest: false
                    }
                }
            },
            dev: {
                constants: {
                    configuration: {
                        site: 'http://0.0.0.0:9000'
                    }
                }
            }
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['<%= yeoman.app %>/**/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        shell: {
            serve: {
                command: "paster serve config.ini",
                options: {
                    //if async: true were omitted, the paster server command would prevent subsequent commands from running
                    async: true
                }
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: false,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect().use(
                                '/app/styles',
                                connect.static('./app/styles')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp',
            generator: '<%= yeoman.generator.app %>'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true,
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                ignorePath:  /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath:  /\.\.\//,
                fileTypes:{
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            },
            sass: {
                src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: './bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    sourcemap: true
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.dist %>/ceres/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>',
                    '<%= yeoman.dist %>/images',
                    '<%= yeoman.dist %>/styles'
                ]
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', '{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat',
                    src: '*.js',
                    dest: '.tmp/concat'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            ngdocs: {
                files: [
                    {
                        nonull: true,
                        expand: true,
                        cwd: 'ngdocs/images/',
                        dest: 'docs/images/',
                        src: ['*.png']
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        '{,*/}*.html',
                        'ceres/{,*/}*.html',
                        'images/{,*/}*.{webp}',
                        'fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= yeoman.dist %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            generator: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.base %>',
                        dest: '<%= yeoman.generator.base %>',
                        src: [
                            'app/**',
                            'Gruntfile.js',
                            'karma.conf.js',
                            'package.json',
                            'protractor.conf.js',
                            'bower.json',
                            'test/**',
                            'features/**',
                            '404.html',
                            'favicon.ico',
                            'robots.txt'
                        ]
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        "regex-replace": {
            packagejson: { //specify a target with any name
                src: ['<%= yeoman.generator.base %>/package.json'],
                actions: [
                    {
                        name: 'script name',
                        search: '  "//": "Template me"(\n|\r|.)*"//": "end",',
                        replace: '  "name": "=<== scriptAppName =>=",',
                        flags: 'g'
                    },
                    {
                        name: 'start tag',
                        search: '=<=',
                        replace: '<%',
                        flags: 'g'
                    },
                    {
                        name: 'stop tag',
                        search: '=>=',
                        replace: '%>',
                        flags: 'g'
                    }
                ]
            },
            testspecs: { //specify a target with any name
                src: ['<%= yeoman.generator.base %>/app/ceres/**/*.spec.js'],
                actions: [
                    {
                        name: 'script name',
                        search: '// Template me(\n|\r|.)*// end',
                        replace: 'beforeEach(module(\'=<== scriptAppName =>=\'));',
                        flags: 'g'
                    },
                    {
                        name: 'start tag',
                        search: '=<=',
                        replace: '<%',
                        flags: 'g'
                    },
                    {
                        name: 'stop tag',
                        search: '=>=',
                        replace: '%>',
                        flags: 'g'
                    }
                ]
            },
            bowerjson: { //specify a target with any name
                src: ['<%= yeoman.generator.base %>/bower.json'],
                actions: [
                    {
                        name: 'script name',
                        search: '  "//": "Template me"(\n|\r|.)*"//": "end",',
                        replace: '  "name": "=<== scriptAppName =>=",',
                        flags: 'g'
                    },
                    {
                        name: 'start tag',
                        search: '=<=',
                        replace: '<%',
                        flags: 'g'
                    },
                    {
                        name: 'stop tag',
                        search: '=>=',
                        replace: '%>',
                        flags: 'g'
                    }
                ]
            },
            appjs: { //specify a target with any name
                src: ['<%= yeoman.generator.base %>/app/app.js'],
                actions: [
                    {
                        name: 'script name',
                        search: '// Template me(\n|\r|.)*// end',
                        replace: '\'=<== scriptAppName =>=\',',
                        flags: 'g'
                    },
                    {
                        name: 'start tag',
                        search: '=<=',
                        replace: '<%',
                        flags: 'g'
                    },
                    {
                        name: 'stop tag',
                        search: '=>=',
                        replace: '%>',
                        flags: 'g'
                    }
                ]
            },
            indexhtml: {
                src: ['<%= yeoman.generator.base %>/app/index.html'],
                actions: [
                    {
                        name: 'script name',
                        search: '<!-- Template me -->(\n|\r|.)*<!-- end -->',
                        replace: '<body ng-app="=<== scriptAppName =>=">',
                        flags: 'g'
                    },
                    {
                        name: 'title name',
                        search: '<!-- Template title -->(\n|\r|.)*<!-- end -->',
                        replace: '<title>=<== appTitle =>=</title>',
                        flags: 'g'
                    },
                    {
                        name: 'start tag',
                        search: '=<=',
                        replace: '<%',
                        flags: 'g'
                    },
                    {
                        name: 'stop tag',
                        search: '=>=',
                        replace: '%>',
                        flags: 'g'
                    }
                ]
            }
        },

        protractor: {
            options: {
                configFile: 'protractor.conf.js',
                //keepAlive: true, commented out because it prevent test failure from making hudson build fail
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            dev: {
                options: {
                    args: {
                        baseUrl: 'http://0.0.0.0:9000',
                        params: {}
                    }
                }
            },
            chrome: {
                options: {
                    args: {
                        browser: 'chrome'
                    }
                }
            }
        },

        ngdocs: {
            options: {
                title: 'Ceres Documentation',
                html5Mode: false
            },
            guide: {
                src: ['ngdocs/*.ngdoc'],
                title: 'Tutorial'
            },
            api: {
                src: ['<%= yeoman.app %>/**/*.js'],
                title: 'API documentation'
            }
        }

    });

    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'shell:serve',
            'ngconstant:dev',
            'concurrent:server',
            'autoprefixer:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'wiredep',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', function(target){
        var mytarget = target;
        if (!mytarget) {
            mytarget = 'dev';
        }
        grunt.task.run([
            'clean:dist',
            'ngconstant:' + mytarget,
            'wiredep',
            'useminPrepare',
            'concurrent:dist',
            'autoprefixer',
            'concat',
            'ngAnnotate',
            'copy:dist',
            'cdnify',
            'cssmin',
            'uglify',
            'filerev',
            'usemin',
            'htmlmin'])
    });

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('makedoc', [
        'ngdocs',
        'copy:ngdocs'
    ]);

    grunt.registerTask('generator', function(){
        var tasks = [
            'clean:dist',
            'clean:generator',
            'copy:generator',
            'regex-replace'
        ];
        grunt.task.run(tasks);
    });
};
