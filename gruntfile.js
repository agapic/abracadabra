var fs = require('fs'),
    path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    ngAnnotate: {
    all: {
        files: {
            
            'public/dist/js/all.js': [
                'public/js/app.js',
                'public/js/controllers/*.js',
                'public/js/directives/*.js',
                'public/js/services/*.js',
                'public/js/filters/*.js'
            ]
        }
    }
},
   uglify: {
            target: {
                options: {
                    mangle: true
                },
                files: {
                    'public/dist/js/all.min.js': ['public/dist/js/all.js']
                }
            }
        },
   jshint: {
            options: {
                force: true
            },
            all: {
                src: [
                   'public/js/filters.js',
                   'public/js/app.js',
                   'public/js/controllers/*.js',
                   'public/js/directives/*.js',
                   'public/js/services/*.js'
                ]
            }
        },
    watch: {
    options: {
        debounceDelay: 100,
        livereload: true
    },
    html: {
        files: ["public/views/**", "public/templates/**"]
    },
    js: {
        files: ["public/js/**"],
        tasks: ['newer:jshint:all', 'ngAnnotate', 'uglify']
    },
    css: {
        files: ["public/css/**"]
    }
  },
   jshint: {
        options: {
            force: true
        },
        all: {
            src: [
               'public/js/filters.js',
               'public/js/routes.js',
               'public/js/controllers/*.js',
               'public/js/directives/*.js',
               'public/js/services/*.js'
            ]
        }
    },
    nodemon: {
        dev: {
            options: {
                file: 'server.js',
                args: [],
                ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                watchedExtensions: ['js'],
                watchedFolders: ['app', 'config'],
                debug: true,
                delayTime: 1,
                env: {
                    PORT: 3000
                },
                cwd: __dirname
            }
        },
    },
            concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
           livereloadx: {
            dir: 'public'
        },
                shell: {
            clean: {
                command: 'rm -rf ./public/dist'
            },
            concat: {
                //command: 'cat public/css/*.less.css > public/css/style.css',
            },
                        //md5sum: {
               // command: 'cp public/dist/js/all.min.js public/dist/js/`md5sum public/dist/js/all.min.js | cut -d " " -f 1`.js',
           // },
        }
  });

   //grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('livereloadx');

    grunt.registerTask('default', function() {
        var target = grunt.option('target') || 'development';

        grunt.task.run([
            'shell:clean',
            'jshint',
            'ngAnnotate',
            'uglify',
           // 'shell:md5sum',
        ]);

        if (target == 'development') {
            grunt.task.run([
                'concurrent:target',
                'livereloadx'
            ]);
        }
    });

};