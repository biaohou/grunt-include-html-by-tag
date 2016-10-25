/*
 * grunt-include-html-by-tag
 * https://github.com/biaohou/grunt-include-html-by-tag
 *
 * Copyright (c) 2016 biaohou
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt){
  // Project configuration.
  var src = "src/",
      dest = 'build/include/';
  
  grunt.initConfig({
    // Configuration to be run (and then tested).
    template : {
        local: {
            options: {
                data: {
                    staticBase: "http://staticBase.com/include",
                }
            },
            files : [
                {
                    expand: true,
                    cwd: dest,
                    src: ["**/*.{js,html,css,php}"],
                    dest: dest
                }
            ]
        }
    },
    clean: {
        folders: [dest]
    },
    copy: {
        main: {
            files: [{
                expand: true,
                src: ['**'],
                dest: dest,
                cwd : src//这个目录下的所有文件 不包括自己本身的目录结构 输出后的不带src路径
            }]
        }
    },
    htmlmin: {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        },
        min: {
            expand: true,
            cwd: dest,
            src: ['**/*.html'],
            dest: dest
        }
    },
	include_html : {
		default_options : {
			options : {
				path : dest//检测编译过的文件 到这一步的时候已经执行完毕template任务
			}
		}
    },
  });

  //Actually load this plugin's task(s).
  grunt.loadTasks("tasks");

  //These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-template');
  grunt.loadNpmTasks("grunt-contrib-nodeunit");

  grunt.registerTask('default', ['clean', 'copy:main', 'htmlmin:min', 'template:local', 'include_html:default_options']);
};