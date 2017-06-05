var _ = require('underscore')
var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var Comment = require('../app/controllers/comment')

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
    app.get('/signin', User.showSignin) //用户登录页面
    app.get('/signup', User.showSignup) //用户注册页面
    app.get('/logout', User.logout)  //logout 用户退出
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list) //userlist page 用户列表页

    //Movie
    app.get('/movie/:id', Movie.detail) //detail page 电影详情页
    app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new) //admin new page 新增电影页
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update) //admin update movie 电影更新页
    app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.save) //admin post movie 电影保存
    app.get('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.list) //list page 电影列表
    app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del) //list delete movie 电影删除

    //comment
    app.post('/user/comment', User.signinRequired, User.adminRequired, Comment.save)
}