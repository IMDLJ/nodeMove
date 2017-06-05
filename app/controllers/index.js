var Movie = require('../models/movie')

//index page 进入首页
exports.index = function(req, res){
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
}