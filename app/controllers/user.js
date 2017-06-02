var User = require('../models/user')

//signup  用户注册
exports.signup =  function(req, res){
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
}

//logout 用户退出
exports.logout = function(req, res){
    delete req.session.user
    //delete app.locals.user
    res.redirect('/')
}

//userlist page 用户列表页
exports.list = function(req, res){
    User.fetch(function(err, users){
        if(err){
            console.log(err)
        }
        res.render('userlist',{
            title: "用户列表页",
            users: users
        })
    })
}