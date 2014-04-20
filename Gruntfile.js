module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 5555,
                    base: 'app'
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/js/**.js'],
                options: {
                    spawn: false,
                }
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
        },
        jshint: {
            all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
            options: {
                globalstrict: true,
            },
            options: {
                reload: true
            },
            globals: {
                jQuery: true,
                $: true,
                "angular": true
            }
        },
        less: {
          development: {
            options: {
              compress: true,
              yuicompress: true,
              optimization: 2
            },
            files: {
              // target.css file: source.less file
              'app/style/css/bootstrap.css': 'app/style/less/bootstrap.less'
            }
          }
        }
    });
    // load task dependencies
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // define tasks
    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);
    grunt.registerTask('fun', [
        'jshint'
    ]);
};