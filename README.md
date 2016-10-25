# grunt-include-html-by-tag

> grunt-include-html-by-tag

## Getting Started
This plugin requires Grunt `0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-include-html-by-tag --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-include-html-by-tag');
```

## 一句话说明 "grunt-include-html-by-tag" 能做什么！

### 一句话
它帮助开发者，实现html版的include命令！

## The "include_html" task

### Overview
In your project's Gruntfile, add a section named `http_post_deploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	include_html : {
		default_options : {
			options : {
				path : dest//检测编译过的文件 到这一步的时候已经执行完毕template任务
			}
		}
    }
});
```

### Options

#### options.path
Type: `String`
当前项目的文件build目录

## 就没其他配置了～试试吧？！

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_