/**
 * @Description: 入口
 * @author: forguo
 * @date: 2020/7/14
 */
const Koa = require('koa');
const JWT = require('koa-jwt');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const koaBodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const config = require('./config');
const errHandle = require('./routes/util/ErrHandle');

const app = new Koa();

/******************
 * 数据库连接 Start
 * ***************/

// 数据库配置
const dataBase = config.dataBase;

// 数据库连接字符串
// const dbStr = `mongodb://${config.dataBase.user}:${config.dataBase.pwd}@${config.dataBase.url}:${config.dataBase.port}/${config.dataBase.name}?authSource=admin`;
const dbStr = `${dataBase.pre}${dataBase.user}:${dataBase.pwd}@${dataBase.url}/${dataBase.name}?retryWrites=true&w=majority&authSource=admin&ssl=true`;
console.log(dbStr);

// 连接MongoDB数据库
mongoose.connect(dbStr, { useNewUrlParser: true, useUnifiedTopology: true });

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

// admin
const adminAuth = require('./routes/admin/auth');
const adminUser = require('./routes/admin/user');
const adminPhoto = require('./routes/admin/photo');
const adminMsg = require('./routes/admin/msg');
const adminInvite = require('./routes/admin/invite');

// common
const common = require('./routes/common/common');

// weapp
const weAuth = require('./routes/weapp/auth');

// error handler
onerror(app);

/**
 *  定义公共的路径，不需要jwt鉴权
 */
const jwt = JWT({
    secret: config.JWT_SECRET
}).unless({
    path: [/^\/public/, /^\/api\/auth/] // 该prefix下的不做校验
});

app.use(koaBodyParser({
    enableTypes: ['json', 'form', 'text']
}));

// app.use(koaBody({
//     multipart: true,
//     encoding: 'gzip',
//     formidable:{
//         maxFileSize: 2000 * 1024 * 1024,    // 设置上传文件大小最大限制，默认2M
//         multipart: true
//     }
// }));

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

// jwt
app.use(errHandle); // 错误鉴权处理
app.use(jwt); // jwt鉴权
// jwt

// logger
app.use(async (ctx, next) => {
    // 设置跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // ctx.set('Access-Control-Allow-Credentials', 'true');
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(adminAuth.routes(), adminAuth.allowedMethods());
app.use(adminUser.routes(), adminUser.allowedMethods());
app.use(adminPhoto.routes(), adminPhoto.allowedMethods());
app.use(adminMsg.routes(), adminMsg.allowedMethods());
app.use(adminInvite.routes(), adminInvite.allowedMethods());

app.use(common.routes(), common.allowedMethods());

app.use(weAuth.routes(), weAuth.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app;
