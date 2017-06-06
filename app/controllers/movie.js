var _ = require('underscore')
var Movie = require('../models/movie')
var Comment = require('../models/comment')
var Category = require('../models/category')

//detail page
exports.detail = function(req, res){
    var id = req.params.id
    Movie.findById(id, function(err, movie){
        Comment.find({movie:id})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.exec(function(err,comments){
                console.log('++' + comments);
                res.render('detail',{
                    title:movie.title,
                    movie:movie,
                    comments:comments
                });
		    });	
    })
}

//admin new page
exports.new = function(req, res){
    Category.find({}, function(err, categories){
         res.render('admin',{
            title: "后台录入页",
            btnName: "录入",
            categories: categories,
            movie: {}
        })
    })
}

//admin update movie
exports.update = function(req, res){
    var id = req.params.id
    if(id){
        Movie.findById(id, function(err, movie){
            res.render('admin', {
                title: "后台更新页",
                btnName: "保存",
                movie: movie
            })
        })
    }
}

//admin post movie
exports.save = function(req, res){
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie

    if (req.poster) {
        movieObj.poster = req.poster
    }

    if(id){
        Movie.findById(id, function(err, movie){
            if(err){
                console.log(err)
            }
            _movie = _.extend(movie, movieObj)
            _movie.save(function(err, movie){
                if(err){
                    console.log(err)
                }
                //res.redirect('/movie/'+ movie._id)
                res.redirect('/admin/movie/list')
            })
        })
    }else{
        _movie = new Movie(movieObj)
        var categoryId = _movie.category
        _movie.save(function(err, movie){
            if(err){
                console.log(err)
            }
            Category.findById(categoryId, function(err, category){
                category.movies.push(movie._id)

                category.save(function(err, category){
                    //res.redirect('/movie/'+ movie._id)
                    res.redirect('/admin/movie/list')
                })
            })
        })
    }
}

//list page
exports.list = function(req, res){
    Movie.fetch(function(err, movies){
        if(err){
            console.log(err)
        }
        res.render('list',{
            title: "后台列表页",
            movies: movies
        })
    })
}

//list delete movie
exports.del = function(req, res){
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
}