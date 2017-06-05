# npm安装模块
npm install express --save
npm install serve-static --save
npm install body-parser --save
npm install jade --save
npm install mongoose --save
npm install bower -g
bower install bootstrap

npm install underscore --save

npm install express-session --save
npm install connect-mongo --save

//express.logger 在express 4.0后已经迁出，现在为morgan，需要先:
npm install morgan --save

# mongodb数据库
// 创建数据库 
use nodemovie 

// 向表中插入数据
db.movies.insert({
country: '美国',
doctor: '比尔·康顿',
flash: 'http://www.iqiyi.com/common/flashplayer/20170406/1556f98c2359.swf',
language: '英语',
"meta":{
	"createAt": ISODate("2016-02-23T09:24:45.175z"),
	"updateAt": ISODate("2016-02-23T09:25:55.245z")
},
poster: 'http://img5.mtime.cn/pi/2016/11/11/095227.77136315_235X235.jpg',
title: '美女与野兽',
year: 2017,
summary: '为了解救触怒野兽的父亲，勇敢善良的贝儿只身一人来到古堡，代替父亲被囚禁其中。贝儿克服了恐惧，和城堡里的魔法家具们成为了朋友，也渐渐发现野兽其实是受了诅咒的王子，他可怕的外表下藏着一颗善良温柔的内心。'
})

// 查询表
db.movies.find({})

// 查询表的记录数
db.movies.find({}).count()

# 页面地址
// 首页： http://127.0.0.1:3000/
// 后台电影录入:  http://127.0.0.1:3000/admin/movie/new
// 后台电影列表:  http://127.0.0.1:3000/admin/movie/list
// 用户列表页： http://127.0.0.1:3000/admin/user/list

# 安装grunt
npm install grunt-cli -g
// 下面几个插件需要安装在项目中
npm install grunt --save-dev 
npm install grunt-contrib-watch --save-dev    //监听文件变动
npm install grunt-nodemon --save-dev
npm install grunt-concurrent --save-dev

# 运行项目
grunt

