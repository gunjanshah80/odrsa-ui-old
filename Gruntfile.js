module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-strip');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-string-replace');          

  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'clean': {
                   all: 'target'
    },
    copy: {
                   options: {
                             quiet: true
                   },                  
                   srcToStage: {
                             cwd: 'src/main',
                             src: ['**'],
                             dest: 'target/stage/',
                             expand: true
                   },
		   copyHtml: {
                             files: [
                                      {
                                                cwd: 'target/stage/app/',
                                                dest: 'target/build/main/',
                                                src: '**/*.html',
                                                expand: true
                                      }
                             ]
                   },
		   staticFromStageToBuild: {
                             files: [
                                      {
                                                cwd: 'target/stage/',
                                                src: 'index.html',
                                                dest: 'target/build/main/',
                                                expand: true
                                      }, 
                                      {
                                                cwd: 'target/stage/app/',
                                                dest: 'target/build/main/',
                                                src: ['!index/index.html', '**/*.{html,json,pdf}'],
                                                expand: true
                                      }, 
                                      {
                                                cwd: 'target/stage/style',
                                                dest: 'target/build/main/style',
                                                src: '**',
                                                expand: true
                                      }
                             ]
                   },
		   cdnDependenciesToStage : {
                       files: [
                           {
                               cwd: 'bower_components/angular',
                               dest: 'target/build/main/bower_components',
                               src:  'angular.js',
                               expand: true
                           },
                           {
                               cwd: 'bower_components/angular-messages',
                               dest: 'target/build/main/bower_components',
                               src:  'angular-messages.js',
                               expand: true
                           },
                           {
                               cwd: 'bower_components/angular-route',
                               dest: 'target/build/main/bower_components',
                               src:  'angular-route.js',
                               expand: true
                           },
                           {
                               cwd: 'bower_components/jquery',
                               dest: 'target/build/main/bower_components',
                               src:  'jquery.js',
                               expand: true
                           },
                           {
                               cwd: 'bower_components/jquery-ui/ui',
                               dest: 'target/build/main/bower_components',
                               src:  'jquery-ui.js',
                               expand: true
                           },
                           {
                               cwd: 'bower_components/json3/lib',
                               dest: 'target/build/main/bower_components',
                               src:  'json3.js',
                               expand: true
                           }
                       ]
                   }
    },
    concat: {                 
                   app_js: {
                             src: ['target/stage/app/**/*.js'],
                             dest: "target/build/main/js/app.js"
                   }
    },
    uglify: {
        options: {
            mangle: true,            
            compress: {
                drop_console: true,
                global_defs: {
                    "DEBUG": false
                },
                dead_code: true
            }
        },
        my_target: {
            files: {
                'target/build/main/js/app.min.js': ['target/build/main/js/app.js']
            }
        }
    },
    connect: {
        server: {
            options: {
                base: 'target/build/main/' ,
                port : 8280
            }
        }
    },
    watch: {
                   static_files: {
                             files: 'src/main/app/**/*.{html,js,json}',
                             tasks: ['build']
                   },                   
                   static_img_css_files: {
                             files: 'src/main/style/**/*.{jpg,png,gif,css}',
                             tasks: ['build']
                   },
                   index_file: {
                             files: 'src/main/index.html', 
                             tasks: ['build']
                   }
    }
  });

  grunt.registerTask('_buildStagingDir', ['copy:srcToStage']);
  grunt.registerTask('_copyStaticFilesToBuild', ['copy:staticFromStageToBuild']);
  grunt.registerTask('_pullLocaljsComponents', ['copy:cdnDependenciesToStage']);
  grunt.registerTask('_concatJsFiles', ['concat:app_js']);
  grunt.registerTask('_uglify',['uglify']);
  grunt.registerTask('_watcher', ['connect', 'watch']);
  grunt.registerTask('build', ['_buildStagingDir', '_copyStaticFilesToBuild', '_pullLocaljsComponents', '_concatJsFiles','_uglify']);
  grunt.registerTask('default', ['clean', 'build', '_watcher']);

};
