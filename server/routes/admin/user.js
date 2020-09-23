/**
 * @Description 账号
 * @Author forguo
 * @Date 2019/12/14
 */

const router = require('koa-router')();
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const ip = require('ip');
const User = require('../../models/User');

const DEFAULT_IMG = 'https://forguo.bj.bcebos.com/icon2596901555144121.jpg';

// 添加路由前缀
router.prefix('/api/user');

/**
 * 获取用户信息
 */
router.get('/info', async (ctx, next) => {
    let query = ctx.request.query;
    let userId = query.userId;
    if (!userId || userId.length === 0) {
        ctx.body = {
            code: 10009,
            success: false,
            message: 'id不能为空',
        };
        return false;
    }

    let param = {
        userId: userId
    };
    let res = await User.findOne(param).catch(error => {
        ctx.body = {
            code: 10086,
            success: false,
            message: error.message
        };
    });

    if (!res || res.length === 0) {
        ctx.body = {
            code: 10086,
            success: false,
            message: '改用户不存在',
        };
    } else {
        ctx.body = {
            code: 200,
            success: true,
            message: 'ok',
            data: res
        };
    }
});

/**
 * 获取用户列表
 */
router.get('/list', async (ctx, next) => {
    let query = ctx.request.query; // if nothing to pass just return a {}
    let current = query.current || 1;
    let pageSize = query.pageSize || 10;
    let skip = (current - 1) * pageSize;
    // 条件检索
    let params = {
        ...query
    };
    delete params.current;
    delete params.pageSize;
    delete params.sorter;
    delete params._timestamp;
    let total = await User.count(params);
    if (total > 0) {
        let res = await User.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
            ctx.body = {
                code: 10086,
                success: false,
                message: error.message
            };
        });
        ctx.body = {
            code: 0,
            success: true,
            message: 'ok',
            data: res,
            total,
            'pageSize': pageSize || 10,
            'current': current || 1
        };
    } else {
        ctx.body = {
            code: 0,
            success: true,
            message: 'ok',
            data: [],
            total,
            'pageSize': pageSize || 10,
            'current': current || 1
        };
    }
});

/**
 * 添加用户
 */
router.post('/add', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            success: false,
            message: '参数不能为空',
        };
        return false;
    }
    const {body} = ctx.request;
    let {
        userName,
        userEmail,
        userMobile,
        userPwd,
        userAvatar
    } = body;
    if (!userName || userName.length === 0) {
        ctx.body = {
            code: 10000,
            success: false,
            message: '用户名不能为空',
        };
        return false;
    }
    if (!userPwd || userPwd.length === 0) {
        ctx.body = {
            code: 10000,
            success: false,
            message: '密码不能为空',
        };
        return false;
    }
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let user = {
        userId: `user-${uuidv4()}`,
        userName,
        userEmail,
        userMobile,
        userPwd: md5(userPwd),
        userIp: ip.address(),
        lastLoginIp: ip.address(),
        lastLoginTime: createTime,
        createTime,
        updateTime: createTime,
        userAvatar: userAvatar || '',
        userRoles: ['admin'],
        userStatus: 1,
        userDesc: '',
        currentAuthority: 'admin'
    };
    let res = await User.create(user).catch(error => {
        ctx.body = {
            code: 10086,
            success: false,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        success: true,
        message: 'ok',
        data: res
    };
});

/**
 * 修改用户信息
 */
router.post('/update', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            success: false,
            message: '参数不能为空',
        };
        return false;
    }
    const {body} = ctx.request;
    let {
        userId,
        userAvatar,
        userEmail,
        userMobile,
        userDesc,
        userPwd
    } = body;
    let updateTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let res = await User.update({
        userId
    }, {
        $set: {
            userEmail,
            userPwd: md5(userPwd),
            userMobile,
            userDesc,
            lastLoginIp: ip.address(),
            lastLoginTime: updateTime,
            updateTime,
            userAvatar: userAvatar || DEFAULT_IMG
        }
    }).catch(error => {
        ctx.body = {
            code: 10086,
            success: false,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        success: true,
        message: 'ok',
        data: res
    };
});

/**
 * 删除用户
 */
router.get('/remove', async (ctx, next) => {

    let _id = ctx.request.query._id || '';

    if (!_id || _id.length === 0) {
        ctx.body = {
            code: 10000,
            message: '用户不存在',
        };
        return false;
    }

    let res = await User.findByIdAndRemove(_id).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        success: true,
        message: 'ok',
        data: {
            _id,
            res: res
        }
    };
});

module.exports = router;
