module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      compile: {
        files: {
          'options/css/index.css': 'options/css/index.less'
        }
      }
    },
    browserify:{
      js:{
        src: 'background/src/index.js',
        dest: 'background/dist/index.js'
      }
    },
    watch: {
    scripts: {
      files: ['options/css/*.less', 'background/src/*.js'],
      tasks: ['less', 'browserify']
    }
  }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less', 'watch']);
};
