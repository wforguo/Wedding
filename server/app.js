/**
 * @Description: 入口
 * @author: forguo
 * @date: 2020/7/14
*/
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const config = require('./config');

/******************
 * 数据库连接 Start
 * ***************/

// 数据库连接字符串
const dbStr = `mongodb://${config.dataBase.user}:${config.dataBase.pwd}@${config.dataBase.url}:${config.dataBase.port}/${config.dataBase.name}?authSource=admin`;
console.log(dbStr);

// 连接MongoDB数据库
mongoose.connect(dbStr, {useNewUrlParser: true});

// mongodb://admin:2333!@106.12.182.39:27019/wedding?readPreference=primary&appname=MongoDB%20Compass&ssl=false
mongoose.connection.on('connected', function () {
    console.log('MongoDB connected success.')
});

mongoose.connection.on('error', function () {
    console.log('MongoDB connected fail.')
});

mongoose.connection.on('disconnected', function () {
    console.log('MongoDB connected disconnected.')
});

/******************
 * 数据库连接 End
 * ***************/

const manageUser = require('./routes/manage/user');
const managePhoto = require('./routes/manage/photo');
const manageMsg = require('./routes/manage/msg');
const manageInvite = require('./routes/manage/invite');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

// logger
app.use(async (ctx, next) => {
    // 设置跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(manageUser.routes(), manageUser.allowedMethods());
app.use(managePhoto.routes(), managePhoto.allowedMethods());
app.use(manageMsg.routes(), manageMsg.allowedMethods());
app.use(manageInvite.routes(), manageInvite.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
