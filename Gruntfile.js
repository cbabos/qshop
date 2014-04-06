'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ['dist']
        },

        copy: {
            dist: {
                src: ['font/*', 'img/*'],
                dest: 'dist/',
            },
        },

        jshint: {
            options: {
                jshintrc: true
            },
            src: ['js/**/*.js']
        },
        uglify: {
            dist: {
                options: {
                    compress: true
                },
                src: ['bower_components/jquery/dist/jquery.js', 'js/**/*.js'],
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },

        autoprefixer: {
            dist: {
                options: {
                    browsers: ['last 2 version']
                },
                expand: true,
                flatten: true,
                src: 'css/*.css',
                dest: 'css/autoprefixed/'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: ['css/*.css'],
        },
        cssmin: {
            dist: {
                src: ['css/autoprefixed/*.css'],
                dest: 'dist/css/<%= pkg.name %>.min.css'
            }
        },

        processhtml: {
            dist: {
                src: ['index.html'],
                dest: 'dist/index.html'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        }

    });

    grunt.registerTask('default', [
        'clean', 'copy',
        'jshint', 'uglify',
        'csslint', 'autoprefixer', 'cssmin',
        'processhtml', 'htmlmin',
    ]);

};
