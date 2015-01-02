var path = require("path");

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-debug-task');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html-convert');

  var templateCwd = 'amp/templates/';
  var templateFiles = '**/*.html';

  // Project configuration.
  grunt.initConfig({
    htmlConvert: {
      options: {
        rename: function(moduleName) {
          var key = path.dirname(moduleName).split(path.sep) // folder names
              .concat([path.basename(moduleName, path.extname(moduleName))]) // template name
              .join(".");

          //prune off any leading zeros
          if (key.charAt(0) == ".")
            key = key.substr(1);
          if (key.charAt(0) == ".")
            key = key.substr(1);

          return key;
        }
      },
      clientHtml: {
        src: [templateCwd + templateFiles],
        dest: 'amp/client/clientHtml.js',
        options: {
          suffix: 'module.exports = clientHtml;',
          base: templateCwd
        }
      }
    },

    delta: {
      templates: {
        cwd: templateCwd,
        files: [templateFiles],
        tasks: ['htmlConvert']
      },
      scripts: {
        files: ['amp/client/**/*.js'],
        tasks: ['browserify']
      }
    },

    browserify: {
      js: {
        src: 'amp/client/**/*.js',
        dest: 'www/assets/js/allJs.js',
        options: {
          browserifyOptions: {
            debug: true
          }
        }
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        "asi": false,
        "esnext": true,
        "bitwise": true,
        "camelcase": true,
        "curly": false,
        "eqeqeq": true,
        "eqnull": true,
        "expr": true,
        "immed": true,
        "indent": 2,
        "latedef": "nofunc",
        "loopfunc": true,
        "newcap": true,
        "node": true,
        "nonew": true,
        "noarg": true,
        "quotmark": "single",
        "regexp": true,
        "sub": true,
        "trailing": true,
        "undef": true,
        "unused": true,
        "white": true
      },
      client: {
        files: {
          src: [
            'client/js/**/*.js',
            '!client/js/vendor/*'
          ]
        },
        options: {
          browser: true
        }
      }
    }
  });

  /**
   * In order to make it safe to just compile or copy *only* what was changed,
   * we need to ensure we are starting from a clean, fresh build. So we rename
   * the `watch` task to `delta` (that's why the configuration var above is
   * `delta`) and then add a new task called `watch` that does a clean build
   * before watching for changes.
   */
  grunt.renameTask( 'watch', 'delta' );
  grunt.registerTask( 'watch', ['default', 'delta'] );
  grunt.registerTask('default', ['htmlConvert','browserify']);

};