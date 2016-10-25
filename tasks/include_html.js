/*
 * grunt-include-html-by-tag
 * https://github.com/biaohou/grunt-include-html-by-tag
 *
 * Copyright (c) 2016 biaohou
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt){
	var fs = require("fs");
    var path = require('path');
	
	grunt.registerMultiTask("include_html","grunt-include-html-by-tag",function(){
		// Tell Grunt this task is asynchronous.
		var done = this.async();
		
		//Merge task-specific and/or target-specific options with these defaults.
		var options = this.data.options;
		
		grunt.verbose.writeflags(options,"Options");
		//Iterate over all specified file groups.
		//this.files[0].orig.src[0]
		
		var file_arr = [];//准备上传的文件列表
			
		grunt.file.recurse(options.path,function(a, b, c, d){
			if(grunt.file.isFile(a)){
				file_arr.push([a, b + (c ? c +"/" : "")]);
			}
		});
		
        var file_arr_l = file_arr.length;
        console.log("----共有"+ file_arr_l +"个文件 开始扫描 include----");
        
        var reg = new RegExp(/(<include\s*(src="|')\S+("|')\s*>)(<\/include>)/i);
        
        for(var i = 0; i < file_arr_l; i++){
            var content = grunt.file.read(file_arr[i][0]);//读出内容
            
            if(reg.test(content)){
                console.log(file_arr[i][0] +" 需要处理include");
                
                var formatedStr = "",//转换后的文本
                    next_start = 0;//下次开始轮询的起点
        
                function doReplace(str){
                    if(reg.test(str)){
                        str.replace(reg,function(d){
                            var l = d.toString().length,
                                temp_d = d,//临时的转换文本
                                sub_str = content.substr(next_start);//从next_start位置 截取字符串 用于后边处理

                            //console.log("这次要处理的内容= "+ sub_str);
                            //console.log("不在规则内的内容= "+ sub_str.substr(0,sub_str.indexOf(d)));
                            //console.log("解析到的字符串＝ "+ d);
                                
                            var include_src = d.substring("<include src=".length + 1, d.indexOf(">")-1),
                                true_include_src = path.join(".", options.path, include_src);//根据当前路径＋发布路径 找到真实路径
                            
                            if(grunt.file.isFile(true_include_src)){
                                //console.log("是文件 include_src="+ true_include_src);
                                var include_src_content = grunt.file.read(true_include_src);//读取文件的真实路径
                                temp_d = include_src_content;
                            }
                            else{
                                //console.log("不是文件 include_src="+ true_include_src);
                            }
                            
                            formatedStr = formatedStr + sub_str.substr(0,sub_str.indexOf(d)) + temp_d;//截取 从开始位置 到第一次出现该字符串的位置
                            next_start = next_start + sub_str.substr(0,sub_str.indexOf(d)).length + l;
                            
                            //console.log("------剩余解析的是 "+ content.substr(next_start));
                            
                            //继续执行过滤
                            doReplace(content.substr(next_start));
                        });
                    }
                    else{
                        //console.log("内容不匹配了 停止解析");
                        formatedStr = formatedStr + str;
                    }
                }
        
                doReplace(content);
                
                //console.log("--打印结果--");
                //console.log(formatedStr);
                
                grunt.file.write(file_arr[i][0], formatedStr);//将新内容写入到文件中
            }
        }
        
        console.log("----include 任务执行完毕-----");
	});
};