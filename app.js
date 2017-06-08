var express = require('express')
var serveStatic = require('serve-static')   //新版express4中，要独立安装static
var path = require('path')
var mongoose = require('mongoose')

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)

var logger = require('morgan') //express.logger 在express 4.0后已经迁出，现在为morgan

var port =process.env.PORT || 3000
var app = express()
var fs = require('fs')
var dbUrl = 'mongodb://localhost/nodemovie'  //数据库地址

mongoose.connect(dbUrl)

//models loading
var models_path = __dirname + '/app/models'
var walk = function(path){
    fs.readdirSync(path)
        .forEach(function(file){
            var newPath = path + '/' + file
            var stat = fs.statSync(newPath)

            if(stat.isFile()){
                if (/(.*)\.(js|coffee)/.test(file)){
                    require(newPath)
                }
            }
            else if(stat.isDirectory()){
                walk(newPath)
            }
        })
}
walk(models_path)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')

// 对application/x-www-form-urlencoded格式内容进行解析
app.use(bodyParser.urlencoded({ extended: true }))
// 对application/json格式进行解析
app.use(bodyParser.json())

//app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(serveStatic('public'))

app.use(session({
    secret: 'nodemovie',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

var env = process.env.NODE_ENV || 'development'
if('development' == env){
    app.set('showStackError', true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}

app.locals.moment = require('moment')
app.listen(port)

require('./config/routes')(app)

console.log('Server running at http://127.0.0.1:3000/')