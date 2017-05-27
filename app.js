var express = require('express')
var serveStatic = require('serve-static')   //新版express4中，要独立安装static
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var User = require('./models/user')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)

var port =process.env.PORT || 3000
var app = express()
var dbUrl = 'mongodb://localhost/nodemovie'

mongoose.connect(dbUrl)

app.set('views', './views/pages')
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({extended: true}))
app.use(serveStatic('public'))
//app.use(express.cookieParser())
app.use(session({
    secret: 'nodemovie',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))
app.locals.moment = require('moment')

app.listen(port)

//index page 进入首页
app.get('/',function(req, res){
    console.log('user is session:')
    console.log(req.session.user)
    Movie.fetch(function(err, movies){
        if(err){
            console.log(err)
        }
         res.render('index',{
            title: "首页",
            movies:movies
        })
    })
})

//signup  用户注册
app.post('/user/signup', function(req, res){
    var _user = req.body.user
    //console.log(_user)
    //req.param('user')

    User.findOne({name: _user.name}, function(err, user){
        if(err){
            console.log(err)
        }
        if(user){
            return res.redirect('/')
        }else{
             var user = new User(_user)
             user.save(function(err, user){
                if(err){
                    console.log(err)
                }
                //console.log(user)
                res.redirect('/admin/userlist')
            })
        }
    })
})

//signin 用户登录
app.post('/user/signin', function(req, res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    User.findOne({name: name}, function(err, user){
        if(err){
            console.log(err)
        }
        if(!user){
            return res.redirect('/')
        }
        user.comparePassword(password, function(err, isMatch){
            if(err){
                console.log(err)
            }
            if(isMatch){
                req.session.user = user

                return res.redirect('/')
            }else{
                console.log('password is not matched')
            }
        })
    })
})

//userlist page 用户列表页
app.get('/admin/userlist',function(req, res){
    User.fetch(function(err, users){
        if(err){
            console.log(err)
        }
        res.render('userlist',{
            title: "用户列表页",
            users: users
        })
    })
})

//detail page
app.get('/movie/:id',function(req, res){
    var id = req.params.id
    Movie.findById(id, function(err, movie){
        res.render('detail', {
            title: movie.title,
            movie: movie
        })
    })
})

//admin page
app.get('/admin/movie',function(req, res){
    res.render('admin',{
        title: "后台录入页",
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
    })
})

//admin update movie
app.get('/admin/update/:id', function(req, res){
     var id = req.params.id
     if(id){
         Movie.findById(id, function(err, movie){
             res.render('admin', {
                 title: "后台更新页",
                 movie: movie
             })
         })
     }
})

//admin post movie
app.post('/admin/movie/new', function(res, req){
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie

    if(id != 'underfined'){
        Movie.findById(id, function(err, movie){
            if(err){
                console.log(err)
            }
            _movie = _.extend(movie, movieObj)
            _movie.save(function(err, movie){
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+ movie._id)
            })
        })
    }else{
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })
        _movie.save(function(err, movie){
            if(err){
                console.log(err)
            }
            res.redirect('/movie/'+ movie._id)
        })
    }
})

//list page
app.get('/admin/list',function(req, res){
    Movie.fetch(function(err, movies){
        if(err){
            console.log(err)
        }
        res.render('list',{
            title: "后台列表页",
            movies: movies
        })
    })
})

//list delete movie
app.delete('/admin/list',function(req, res){
    var id = req.query.id
    if(id){
        Movie.remove({_id: id},function(err, movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
})

console.log('Server running at http://127.0.0.1:3000/')