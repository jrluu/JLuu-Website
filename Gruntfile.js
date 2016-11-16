module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Compress html
        htmlmin: {
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   // Dictionary of files
                'index.html': 'assets/index.html',     // 'destination': 'source'
              }
            },
        },

        //Compress CSS
        cssmin: {
          options:{
            rebase: false
          },
          target: {
            files: {
              'build/css/production.min.css':['assets/css/*.css']
            }
          }
        },

        //Concat JS  files
        concat: {
            js: {
                src: [
                    'assets/js/bootstrap.js', // Ordering matters
                    'assets/js/*.js'
                ],
                dest: 'build/js/production.js',
            },
        },

        //Compress JS
        uglify: {
            build: {
                src: 'build/js/production.js',
                dest: 'build/js/production.min.js'
            }
        },

        //Compress images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/used/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/images/used/'
                }]
            }
        },
/*
        //Turn SASS files to CSS
        sass: {
          dist: {
            files: [{
              expand: true,
              cwd: 'assets/sass/',
              src: ['*.scss'],
              dest:'assets/css/',
              ext: '.css'
            }]
          }
        },
*/

        //Runs task based on file changes
        watch: {
          js_change: {
            files: ['assets/js/*'],
            tasks: ['concat', 'uglify'],
          },
          image_change:{
            files:['assets/img/used/*'],
            tasks:['imagemin'],
          },
          html_change:{
            files:['assets/index.html'],
            tasks:['htmlmin'],
          },
          /*
          css_change:{
            files:['assets/sass/*.scss'],
            tasks:['sass', 'cssmin'],

          }
          */

        },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');



    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
//    grunt.registerTask('default', ['sass','htmlmin','cssmin','concat', 'uglify','imagemin']);
    grunt.registerTask('default', ['htmlmin','cssmin','concat', 'uglify','imagemin']);
};
