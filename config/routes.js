var _ = require('underscore')
var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')

module.exports = function(app){
    //pre handle user
    app.use(function(req, res, next){
        var _user = req.session.user

        app.locals.user = _user
        
        next()
    })

    //index 
    app.get('/', Index.index)  //进入首页

    //User 
    app.post('/user/signup', User.signup) //signup 用户注册
    app.post('/user/signin', User.signin) //signin 用户登录
    app.get('/logout', User.logout)  //logout 用户退出
    app.get('/admin/userlist', User.list) //userlist page 用户列表页

    //Movie
    app.get('/movie/:id', Movie.detail) //detail page 电影详情页
    app.get('/admin/new', Movie.new) //admin new page 新增电影页
    app.get('/admin/update/:id', Movie.update) //admin update movie 电影更新页
    app.post('/admin/movie', Movie.save) //admin post movie 电影保存
    app.get('/admin/list', Movie.list) //list page 电影列表
    app.delete('/admin/list', Movie.del) //list delete movie 电影删除
}