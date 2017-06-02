var express = require('express')
var serveStatic = require('serve-static')   //新版express4中，要独立安装static
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')

var session = require('express-session')
var mongoStore = require('connect-mongo')(session)

var logger = require('morgan') //express.logger 在express 4.0后已经迁出，现在为morgan

var port =process.env.PORT || 3000
var app = express()
var dbUrl = 'mongodb://localhost/nodemovie'  //数据库地址

mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')

app.use(bodyParser.urlencoded({extended: true}))
app.use(serveStatic('public'))
app.use(session({
    secret: 'nodemovie',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

if('development' === app.get('env')){
    app.set('showStackError', true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}

app.locals.moment = require('moment')
app.listen(port)

require('./config/routes')(app)

console.log('Server running at http://127.0.0.1:3000/')