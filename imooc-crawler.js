'use strict';

// 用JS的严格模式，保证语法的严格性，强化 JS 语法的 若类型 风格，向 Java 看齐
// 用 const let 替换 var，不再使用 var
const http = require('http');
// const cheerio = require('cheerio');

const url = 'http://www.imooc.com/learn/348';

/**
 * 从 HTML 中过滤课程信息
 * @param html 网页中的 HTML
 */

/**
 * 打印出课程信息
 * @param courseData [] 课程数据
 */


http.get(url, (res) => {
  // let html;
  // ES6箭头函数
  let html = '';
  res.setEncoding('utf8');
 // res.on('data', (chunk) => rawData += chunk);
  res.on('data', (data) => html += data);
  // 1、以后统一用箭头函数e
  // 2、用 模板字符串 ${html}${data} 来代替 字符串连接，${html}花括号里面放变量，花括号外面放常量
  res.on('end', () => {
    // 注：此 HTML 为空，如何构建数据呢？
  //  const courseData = filterChapters(html);
    // console.log('courseData', courseData);
  //  printCourseInfo(courseData);
    console.log(html);
  });
  // JS语法
  // res.on('data',function(data) {
  //   html += data
  // })
  // res.on('end',function() {
  //   console.log(html)
  // })
}).on('error', () => {
  console.log('获取课程数据出错！');
});
