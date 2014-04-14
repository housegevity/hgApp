module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    //enable js-hint
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'app'
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/js/**/*.js'],
                options: {
                    spawn: false,
                }
            },
            src: {
                files: ['app/views/**/*.html', 'app/index.html']
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
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
        }
    });
    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);
};