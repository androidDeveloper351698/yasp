module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'curl-dir': {
      'src/lib/js': [
        'http://code.jquery.com/jquery-1.10.2.min.js',
        'http://code.jquery.com/qunit/qunit-1.12.0.js',
        'https://raw.github.com/AStepaniuk/qunit-parameterize/master/qunit-parameterize.js',
        'https://raw.github.com/alex-seville/blanket/master/dist/qunit/blanket.min.js',
        'http://netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js',
        'https://raw.github.com/marijnh/CodeMirror/master/lib/codemirror.js'
        
      ],
      'src/lib/css': [
        'http://code.jquery.com/qunit/qunit-1.12.0.css',
        'http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css',
        'http://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css',
        'https://raw.github.com/marijnh/CodeMirror/master/lib/codemirror.css'
      ],
      'src/lib/fonts': [
        'http://netdna.bootstrapcdn.com/font-awesome/4.0.3/fonts/fontawesome-webfont.eot',
        'http://netdna.bootstrapcdn.com/font-awesome/4.0.3/fonts/fontawesome-webfont.svg',
        'http://netdna.bootstrapcdn.com/font-awesome/4.0.3/fonts/fontawesome-webfont.woff'
      ],
      'src/lib/themes': [
        'https://raw.github.com/marijnh/CodeMirror/master/theme/3024-day.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/3024-night.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/ambiance.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/base16-dark.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/base16-light.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/blackboard.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/cobalt.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/eclipse.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/elegant.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/midnight.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/monokai.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/neat.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/night.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/paraiso-dark.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/paraiso-light.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/rubyblue.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/solarized.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/the-matrix.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/tomorrow-night-eighties.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/twilight.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/vibrant-ink.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/xq-dark.css',
        'https://raw.github.com/marijnh/CodeMirror/master/theme/xq-light.css'
      ],
      'src/lib/addon': [
        'https://raw.github.com/marijnh/CodeMirror/master/addon/hint/show-hint.js',
        'https://raw.github.com/marijnh/CodeMirror/master/addon/hint/show-hint.css',
        'https://raw.github.com/marijnh/CodeMirror/master/addon/lint/lint.js',
        'https://raw.github.com/marijnh/CodeMirror/master/addon/lint/lint.css',
        'https://raw.github.com/marijnh/CodeMirror/master/addon/search/search.js',
        'https://raw.github.com/marijnh/CodeMirror/master/addon/search/searchcursor.js',
        'https://raw.github.com/marijnh/CodeMirror/master/addon/dialog/dialog.js',
        'https://raw.github.com/marijnh/CodeMirror/master/addon/dialog/dialog.css'
      ]
    },
    doctool: {
      commandsjs: {
        converter: "commandsjs",
        input: "src/app/instructions/",
        output: "src/app/js/commands.js"
      },
      html: {
        converter: "htmlsimple",
        input: "src/app/instructions/",
        output: "src/app/help/help.html"
      },
      complex: {
        converter: "htmlcomplex",
        input: "src/app/instructions/",
        output: "src/app/help/complex_help.html"
      }
    },
    watch: {
      commands: {
        files: ['src/app/instructions/**/*.js'],
        tasks: ['doctool']
      },
      doc: {
        files: ['src/app/**/*.js'],
        tasks: ['jsdoc:dist']
      }
    },
    jsdoc : {
      dist : {
        src: [
          './src/app/js/**/*.js',
        ],
        options: {
          destination: 'doc/jsdoc'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8082,
          base: 'src',
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-doctool');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', [ ]);
  grunt.registerTask('deps', [ 'curl-dir' ]);
  grunt.registerTask('commands', [ 'doctool' ]);
  grunt.registerTask('watchcommands', [ 'watch:commands' ]);
  grunt.registerTask('http', [ 'connect' ]);
  grunt.registerTask('doc', [ 'jsdoc' ]);
  grunt.registerTask('watchdoc', [ 'watch:doc' ]);
};
