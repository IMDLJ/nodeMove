var User = require('../models/user')

//注册页面
exports.showSignup =  function(req, res){
    res.render('signup', {
        title:'注册页面'
    })
}

//登录页面
exports.showSignin =  function(req, res){
    res.render('signin', {
        title:'登录页面'
    })
}

//signup  用户注册
exports.signup =  function(req, res){
    var _user = req.body.user

    //var _userid = req.params.
    //console.log(req.params)
    //console.log(_user)
    //req.param('user')

    User.findOne({name: _user.name}, function(err, user){
        if(err){
            console.log(err)
        }
        if(user){
            return res.redirect('/signin')
        }else{
            var user = new User(_user)
            user.save(function(err, user){
                if(err){
                    console.log(err)
                }
                //console.log(user)
                res.redirect('/')
            })
        }
    })
}

//signin 用户登录
exports.signin = function(req, res){
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    User.findOne({name: name}, function(err, user){
        if(err){
            console.log(err)
        }
        if(!user){
            return res.redirect('/signup')
        }
        user.comparePassword(password, function(err, isMatch){
            if(err){
                console.log(err)
            }
            if(isMatch){
                req.session.user = user

                return res.redirect('/')
            }else{
                //console.log('password is not matched')
                return res.redirect('/signin')
            }
        })
    })
}

//logout 用户退出
exports.logout = function(req, res){
    delete req.session.user
    //delete app.locals.user
    res.redirect('/')
}

//userlist page 用户列表页
exports.list = function(req, res){
    // var user = req.session.user
    // if(!user){
    //     return res.redirect('/signin')
    // }
    //if(user.role > 10){
        User.fetch(function(err, users){
            if(err){
                console.log(err)
            }
            res.render('userlist',{
                title: "用户列表页",
                users: users
            })
        })
    //}
}

//midware for user
exports.signinRequired = function(req, res, next){
    var user = req.session.user
    if(!user){
        return res.redirect('/signin')
    }
    next()
}

exports.adminRequired = function(req, res, next){
    var user = req.session.user
    if(user.role <= 10){
        return res.redirect('/signin')
    }
    next()
}