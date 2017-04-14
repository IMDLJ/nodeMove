var express = require('express');
var port =process.env.PORT || 3000;
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);
//app.set('port', 3000);

//index page
app.get('/',function(req, res){
    res.render('index',{
        title: "首页",
        movies:[{
            title:'机械战警',
            _id:1,
            poster: 'http://http//r3.ykimg.com/6787989777787977779099'
        },{
            title:'机械战警',
            _id:2,
            poster: 'http://http//r3.ykimg.com/6787989777787977779099'
        },{
            title:'机械战警',
            _id:3,
            poster: 'http://http//r3.ykimg.com/6787989777787977779099'
        },{
            title:'机械战警',
            _id:4,
            poster: 'http://http//r3.ykimg.com/6787989777787977779099'
        },{
            title:'机械战警',
            _id:5,
            poster: 'http://http//r3.ykimg.com/6787989777787977779099'
        },{
            title:'机械战警',
            _id:6,
            poster: 'http://http//r3.ykimg.com/6787989777787977779099'
        }]
    });
});

//detail page
app.get('/movie/:id',function(req, res){
    res.render('detail',{
        title: "详情页"
    });
});

//admin page
app.get('/admin/movie',function(req, res){
    res.render('admin',{
        title: "后台主页"
    });
});

//list page
app.get('/admin/list',function(req, res){
    res.render('list',{
        title: "列表页"
    });
});