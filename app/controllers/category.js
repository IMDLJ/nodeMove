var Category = require('../models/category')

//admin new page
exports.new = function(req, res){
    res.render('category',{
        title: "电影分类--后台录入页",
        btnName: "录入",
        category: {
            name: ''
        }
    })
}

//admin post movie cate
exports.save = function(req, res){
    var _category = req.body.category

    var category = new Category(_category)
    //console.log(category)
    category.save(function(err, category){
        if(err){
            console.log(err)
        }
        res.redirect('/admin/category/list')
    })
}

//cate list page
exports.list = function(req, res){
    Category.fetch(function(err, categories){
        if(err){
            console.log(err)
        }
        res.render('categorylist',{
            title: "电影分类列表页",
            categories: categories
        })
    })
}

//cate list delete 
exports.del = function(req, res){
    var id = req.query.id
    if(id){
        Category.remove({_id: id},function(err, category){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
}