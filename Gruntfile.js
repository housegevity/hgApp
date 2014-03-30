module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
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
        }
    });
    grunt.registerTask('serve', [
        'connect',
        'watch'
    ]);
};