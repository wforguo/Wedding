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
const middleWares = require('./middleWares');
const dbConnect = require('./util/dbConnect');
require('./util/util');

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

module.exports = app;
