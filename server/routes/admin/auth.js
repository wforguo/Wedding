/**
 * @Description 登录模块
 * @Author forguo
 * @Date 2019/12/14
 */

const router = require('koa-router')();
const md5 = require('md5');
const jsonWebToken = require('jsonwebtoken');
const config = require('../../config');
const User = require('../../models/User');

const DEFAULT_IMG = 'https://forguo.bj.bcebos.com/icon2596901555144121.jpg';

// 添加路由前缀
router.prefix('/api/auth');

/**
 * 管理员登录
 */
router.post('/login', async (ctx, next) => {
    // 接受用户数据
    // 验证用户账号、密码是否正确
    // 返回token
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10009,
            success: false,
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
            success: false,
            message: '用户名不能为空',
        };
        return false;
    }
    if (!userPwd || userPwd.length === 0) {
        ctx.body = {
            code: 10009,
            success: false,
            message: '密码不能为空',
        };
        return false;
    }

    let param = {
        userName,
        userPwd: md5(userPwd)
    };

    let res = await User.findOne(param).catch(error => {
        ctx.body = {
            code: 10086,
            success: false,
            message: error.message,
            data: userName
        };
    });

    if (!res || res.length === 0) {
        ctx.throw(401, 'Bad Authorization header format. Format is "Authorization: Bearer <token>"');
        // ctx.body = {
        //     success: false,
        //     code: 10086,
        //     message: '用户名或密码错误',
        //     data: res
        // };
    } else {
        //  Header + Payload + Signature
        // 生产登录的token
        const token = jsonWebToken.sign({
            _id: res._id,
            userName: res.userName
        }, config.JWT_SECRET, {
            expiresIn: '7d'
        });
        let data = JSON.parse(JSON.stringify(res));
        data.token = token;
        delete data.userPwd;
        ctx.body = {
            code: 200,
            success: true,
            message: 'ok',
            data,
        };
    }
});
module.exports = router;
