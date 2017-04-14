var express = require('express');
var serveStatic = require('serve-static');   //新版express4中，要独立安装static
var bodyParser = require('body-parser');
var path = require('path');
var port =process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');

//app.use(express.bodyParser());   //新版express已不支持app.use(express.bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(serveStatic('bower_components'));

app.listen(port);
//app.set('port', 3000);

//index page
app.get('/',function(req, res){
    res.render('index',{
        title: "首页",
        movies:[{
            title:'美女与野兽',
            _id:1,
            poster: 'http://img5.mtime.cn/pi/2016/11/11/095227.77136315_235X235.jpg'
        },{
            title:'美女与野兽',
            _id:2,
            poster: 'http://img5.mtime.cn/pi/2016/11/11/095227.77136315_235X235.jpg'
        },{
            title:'美女与野兽',
            _id:3,
            poster: 'http://img5.mtime.cn/pi/2016/11/11/095227.77136315_235X235.jpg'
        },{
            title:'美女与野兽',
            _id:4,
            poster: 'http://img5.mtime.cn/pi/2016/11/11/095227.77136315_235X235.jpg'
        },{
            title:'美女与野兽',
            _id:5,
            poster: 'http://img5.mtime.cn/pi/2016/11/11/095227.77136315_235X235.jpg'
        },{
            title:'美女与野兽',
            _id:6,
            poster: 'http://img5.mtime.cn/pi/2016/11/11/095227.77136315_235X235.jpg'
        }]
    });
});

//detail page
app.get('/movie/:id',function(req, res){
    res.render('detail',{
        title: "详情页",
        movie:{
            doctor: 'dgfgf',
            country: '美国',
            title: '美女与野兽',
            year: 2017,
            poster: 'http://img5.mtime.cn/pi/2016/11/11/095227.77136315_235X235.jpg',
            language: '英语',
            flash: 'http://www.iqiyi.com/common/flashplayer/20170406/1556f98c2359.swf',
            summary: '为了解救触怒野兽的父亲，勇敢善良的贝儿只身一人来到古堡，代替父亲被囚禁其中。贝儿克服了恐惧，和城堡里的魔法家具们成为了朋友，也渐渐发现野兽其实是受了诅咒的王子，他可怕的外表下藏着一颗善良温柔的内心。'
        }
    });
});

//admin page
app.get('/admin/movie',function(req, res){
    res.render('admin',{
        title: "后台主页",
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});

//list page
app.get('/admin/list',function(req, res){
    res.render('list',{
        title: "列表页",
        movies:[{
            title: '美女与野兽',
            _id: 1,
            doctor: 'dgfgf',
            country: '美国',
            year: 2017,
            language: '英语',
            flash: 'http://movie.mtime.com/195064/'
        },{
            title: '美女与野兽',
            _id: 2,
            doctor: 'dgfgf',
            country: '美国',
            year: 2017,
            language: '英语',
            flash: 'http://movie.mtime.com/195064/'
        },{
            title: '美女与野兽',
            _id: 3,
            doctor: 'dgfgf',
            country: '美国',
            year: 2017,
            language: '英语',
            flash: 'http://movie.mtime.com/195064/'
        },{
            title: '美女与野兽',
            _id: 4,
            doctor: 'dgfgf',
            country: '美国',
            year: 2017,
            language: '英语',
            flash: 'http://movie.mtime.com/195064/'
        },{
            title: '美女与野兽',
            _id: 5,
            doctor: 'dgfgf',
            country: '美国',
            year: 2017,
            language: '英语',
            flash: 'http://movie.mtime.com/195064/'
        },{
            title: '美女与野兽',
            _id: 6,
            doctor: 'dgfgf',
            country: '美国',
            year: 2017,
            language: '英语',
            flash: 'http://movie.mtime.com/195064/'
        }]
    });
});