module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Concat JS files
        concat: {
            dist: {
                src: [
                    'assets/js/libs/*.js', // All JS in the libs folder
                ],
                dest: 'assets/js/build/production.js',
            }
        },

        //Removes JS formatting to save space
        uglify: {
            build: {
                src: 'assets/js/build/production.js',
                dest: 'assets/js/build/production.min.js'
            }
        },

        //Compress images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/used/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/images/build/'
                }]
            }
        },


        htmlmin: {                                     // Task
            dist: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   // Dictionary of files
                'index.html': 'src/index.html',     // 'destination': 'source'
              }
            },
        },

        //Runs task based on file changes
        watch: {
          js_change: {
            files: ['assets/js/*'],
            tasks: ['concat', 'uglify'],
          },
          image_change:{
            files:['assets/images/used/*'],
            tasks:['imagemin'],
          },
        },   

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify','imagemin']);

};