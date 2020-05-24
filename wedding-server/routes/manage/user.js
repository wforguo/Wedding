/**
 * @Description 管理系统相关接口
 * @Author forguo
 * @Date 2019/12/14
 */

const router = require('koa-router')();
const config = require('../../config');
const mongoose = require('mongoose');
const User = require('../../models/user');
require('../../util/util');

// 数据库连接字符串
const dbStr = `mongodb://${config.database.user}:${config.database.pwd}@${config.database.url}:${config.database.port}/${config.database.name}?authSource=admin`;
console.log(dbStr);

// 连接MongoDB数据库
mongoose.connect(dbStr, {useNewUrlParser: true});

// mongodb://admin:2333!@106.12.182.39:27019/wedding?readPreference=primary&appname=MongoDB%20Compass&ssl=false
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});

// 添加路由前缀
router.prefix('/api');

/**
 * 管理员登录
 */
router.post('/user/login', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10009,
            message: '用户名或密码不能为空不能为空',
        };
        return false;
    }
    let request = ctx.request.body;
    let userName = request.userName;
    let userPwd = request.userPwd;
    if (!userName || userName.length === 0) {
        ctx.body = {
            code: 10009,
            message: '用户名不能为空',
        };
        return false;
    }
    if (!userPwd || userPwd.length === 0) {
        ctx.body = {
            code: 10009,
            message: '密码不能为空',
        };
        return false;
    }

    let param = {
        userName,
        userPwd
    };

    let res = await User.findOne(param).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });

    if (!res || res.length === 0) {
        ctx.body = {
            success: false,
            code: 10086,
            message: '用户名或密码错误',
        };
    } else {
        const user = {
            userId: res.userId,
            userName: res.userName,
            userTime: res.userTime,
            userAvatar: res.userAvatar,
            userRoles: res.userRoles,
        };
        console.log(user);
        ctx.body = {
            code: 200,
            success: true,
            message: 'ok',
            data: user
        };
    }
})

/**
 * 获取用户信息
 */
router.get('/user/info', async (ctx, next) => {
    let query = ctx.request.query;
    console.log(query);
    let userId = query.userId || '10001';
    if (!userId || userId.length === 0) {
        ctx.body = {
            code: 10009,
            message: '用户id不能为空',
        };
        return false;
    }

    let param = {
        userId: userId
    };
    let res = await User.findOne(param).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });

    if (!res || res.length === 0) {
        ctx.body = {
            code: 10086,
            message: '改用户不存在',
        };
    } else {
        console.log(res)
        const user = {
            userId: res.userId,
            userName: res.userName,
            userTime: res.userTime,
            userAvatar: res.userAvatar,
            userRoles: res.userRoles,
        }
        ctx.body = {
            code: 0,
            message: 'ok',
            data: user
        };
    }
})

router.post('/user/info', async (ctx, next) => {
    let request = ctx.request.body;
    console.log(request);
    let userId = request.userId;
    if (!userId || userId.length === 0) {
        ctx.body = {
            code: 10009,
            message: '用户id不能为空',
        };
        return false;
    }

    let param = {
        userId: userId
    };
    let res = await User.findOne(param).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });

    if (!res || res.length === 0) {
        ctx.body = {
            code: 10086,
            message: '改用户不存在',
        };
    } else {
        console.log(res)
        const user = {
            userId: res.userId,
            userName: res.userName,
            userTime: res.userTime,
            userAvatar: res.userAvatar,
            userRoles: res.userRoles,
        }
        ctx.body = {
            code: 0,
            message: 'ok',
            data: user
        };
    }
})

/**
 * 获取用户列表（post方式）
 */
router.post('/user/list', async (ctx, next) => {
    let request = ctx.request.body;
    let pageNum = request.pageNum || 1;
    let pageSize = request.pageSize || 10;
    let skip = (pageNum - 1) * pageSize;
    let params = {};
    let res = await User.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 0,
        message: 'ok',
        data: {
            count: res.length,
            list: res
        }
    };
})

/**
 * 获取用户列表（get方式）
 */
router.get('/user/list', async (ctx, next) => {
    let query = ctx.request.query; // if nothing to pass just return a {}
    let pageNum = query.pageNum || 1;
    let pageSize = query.pageSize || 10;
    let skip = (pageNum - 1) * pageSize;
    let params = {};
    console.log(skip)
    console.log(pageSize)
    let res = await User.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    console.log(res);
    ctx.body = {
        code: 0,
        message: 'ok',
        data: {
            count: res.length,
            list: res
        }
    };
})

/**
 * 添加用户
 */
router.post('/user/add', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            message: '参数不能为空',
        };
        return false;
    }
    let userName = ctx.request.body.userName;
    if (!userName || userName.length === 0) {
        ctx.body = {
            code: 10000,
            message: '用户名不能为空',
        };
        return false;
    }
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let platform = 'user';
    let r1 = Math.floor(Math.random() * 10);
    let r2 = Math.floor(Math.random() * 10);

    let sysDate = new Date().Format('yyyyMMddhhmmss');
    let id = platform + r1 + sysDate + r2;
    let user = new User({
        userId: id,
        userName: userName,
        userPwd: 123456,
        userTime: createTime
    });
    let res = await user.save().catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 0,
        message: 'ok',
        data: res
    };
})

/**
 * 删除用户
 */
router.post('/user/del', async (ctx, next) => {

    let userId = ctx.request.body.userId || '';

    if (!userId || userId.length === 0) {
        ctx.body = {
            code: 10000,
            message: '用户不存在',
        };
        return false;
    }

    let res = await User.deleteOne({'_id': userId}).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 0,
        message: 'ok',
        data: {
            res: res
        }
    };
})

module.exports = router
