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
   

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify','imagemin']);

};