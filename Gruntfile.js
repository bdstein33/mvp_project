module.exports = function(grunt) {

  // All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Defines concat function that tells grunt to concatenate  
    // all javascript files in public/js into a production.js file
    concat: {
      // options: {
      //   separator: ';'
      // },
      dist: {
        src: ['public/js/*.js'],
        dest: 'public/production.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },

      build: {
        src: 'public/production.js',
        dest: 'public/production.js'
      }
    },

    // imagemin: {
    //   dynamic: {
    //     file: [{
    //       expand: true,
    //       cwd: 'public/img',
    //       src: ['**/*.{png,jpg,gif}'],
    //       dest: 'public/img/build'
    //     }]
    //   }
    // },

    watch: {
      scripts: {
        files: ['public/js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      }
    }
  });

  // Load plugins into grunt
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-concat'); // concat js into one file
  grunt.loadNpmTasks('grunt-contrib-uglify'); // minimize js file
  // grunt.loadNpmTasks('grunt-contrib-imagemin'); // optimize images

  // Tells Grunt what to do when we type "Grunt" into the terminal
  grunt.registerTask('default', 'updateJS');

  grunt.registerTask('updateJS', ['concat', 'uglify']);

  //Example of a task
  // grunt.registerTask('test', ['jshint', 'qunit'])

};