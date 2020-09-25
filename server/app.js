/**
 * @Description: 入口
 * @author: forguo
 * @date: 2020/7/14
 */
const Koa = require('koa');
const onerror = require('koa-onerror');
const compress = require('koa-compress');
const chalk = require('chalk');
const figlet = require('figlet');
const log4js = require('log4js');
const {name: proName} = require('./package');
const middleWares = require('./middleWares');
const dbConnect = require('./util/dbConnect');
require('./util/util');

log4js.configure({
    appenders: {
        error: {
            type: 'file',
            category: 'errLogger',    // 日志名称
            filename: `./logs/${getFileName()}-${proName}.log`
        },
        response: {
            type: 'dateFile',
            category: 'resLogger',
            filename: __dirname + './logs/responses/',
            pattern: 'yyyy-MM-dd.log', // 日志输出模式
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        }
    },
    categories: {
        error: {appenders: ['error'], level: 'error'},
        response: {appenders: ['response'], level: 'info'},
        default: { appenders: ['response'], level: 'info'}
    },
    replaceConsole: true
});

// console.log(chalk.yellow.bold('------------- Wedding Server ------------- \n'));
figlet('Wedding  Server', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err); // 打印出该对象的所有属性和属性值.
        return;
    }
    data && console.log(chalk.yellow(data));
});

const app = new Koa();

// 连接数据库
dbConnect();

// admin
// const adminAuth = require('./routes/admin/auth');
// const adminUser = require('./routes/admin/user');
const adminActivity = require('./routes/admin/activity');
// const adminMsg = require('./routes/admin/msg');
// const adminInvite = require('./routes/admin/invite');

// common
// const common = require('./routes/common/common');

// weapp
// const weAuth = require('./routes/weapp/auth');

// error handler
onerror(app);

if (process.env.NODE_ENV === 'production') {
    app.use(compress())
}

app.use(middleWares);

// routes
// app.use(adminAuth.routes(), adminAuth.allowedMethods());
// app.use(adminUser.routes(), adminUser.allowedMethods());
app.use(adminActivity.routes(), adminActivity.allowedMethods());
// app.use(adminMsg.routes(), adminMsg.allowedMethods());
// app.use(adminInvite.routes(), adminInvite.allowedMethods());

// app.use(common.routes(), common.allowedMethods());

// app.use(weAuth.routes(), weAuth.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

//获取当前时间
function getFileName() {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}

module.exports = app;
