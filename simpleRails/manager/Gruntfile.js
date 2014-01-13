module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-karma');

  // grunt.loadNpmTasks('grunt-contrib-less');

  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {separator: ';'},
      js: {
        src: [
          'app/js/lib/angular.min.js',
          'app/js/lib/angular-ui.js',
          'app/js/lib/facebook.js',
          'app/js/declare.js',
          'app/js/controllers/*',
          'app/js/directives/*',
          'app/js/utility/*',

          '.build/templates.js',

        ],
        dest: '.build/script.js'
      },
      css: {
        src: [
          'app/css/manager.css',
          'app/css/bootstrap/*.css'
        ],
        dest: '.build/manager.css'
      }
    },
    watch: {
      files: [
        'app/js/*',
        'app/js/controllers/*',
        'app/js/directives/*',
        'app/js/utility/*',
        'app/js/real_time/*',
        'app/js/lib/facebook.js',
        'app/index.html',

        'app/views/partials/*.html',
        'app/views/**/*.html',

        'app/css/*.css'
      ],
      tasks: 'default'
    },
    copy: {
      manager: {
        files: [
          {src: ['.build/script.js'], dest: '../public/script.js'},
          {src: ['app/index.html'], dest: '../public_2/index.html'},
          {src: ['.build/manager.css'], dest: '../public/manager.css'},
          {src: ['app/auth.html'], dest: '../public/auth.html'},
          {src: ['app/js/lib/facebook.js'], dest: '../public/facebook.js'}
        ]
      }
    },karma: {
      spec: {
        configFile: 'test/karma.conf.js'
      }
    },
    ngtemplates: {
      'phonecatApp': {
        options: {
          base: 'app/views/'
        },
        src: ['app/views/**/*.html'],
        dest: '.build/templates.js'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['ngtemplates','concat','copy']);

};
