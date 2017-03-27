var http = require ('http')
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348'

function filterChapters(html) {
  $ = cheerio.load(html)
  var chapters = $('.chapter')

  // [{
 //   chapterTitle: '',
 //   videos: [
 //     title: '',
 //     id: ''
 //   ]
 // }]

 var courseData
 chapters.each(function(item) {
   var chapter = $(this)//每一个单独的dom
   var chapterTitle = chapter.find('strong').text()
   var videos = chapter.find('.video').children('li')

   var chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    }

    videos.each(function(item) {
      var video = $(this).find('J-media-item')
      var videoTitle = video.text()
      var videoId = video.attr('href').split('/')[1]
      chapterData.videos.push({
       title: videoTitle,
       videoId: videoId
     })
    })
   courseData.push(chapterData)

 })
  return courseData
}

function printCourseInfo(courseData) {
  courseData.forEach(function(item) {
    var chapterTtitle = item.chapterTtitle
    console.log(chapterTtitle + '\n')

    item.videos.forEach(function(video) {
      console.log('【' + video.videoId + '】 :' + video.title + '\n')
    })
  })
}

http.get(url , function(res) {
  var html = ''

  //ES6箭头函数
  res.on('data', (data) => html += data)
  res.on('end' , () => {
    var courseData = filterChapters(html)
    printCourseInfo(courseData)
    // console.log(html)
  })
  //JS语法
  // res.on('data',function(data) {
  //   html += data
  // })
  // res.on('end',function() {
  //   console.log(html)
  // })
}).on('error', () => {
  console.log('获取课程数据出错！')
})
