/**
 * @Description: 小程序端
 * @author: forguo
 * @date: 2020/7/21
*/
const router = require('koa-router')();
const config = require('../../config');
const weApp = config.weApp;
const getRunData = require('./../util/getRunData');
const koa2Req = require('koa2-request'); // 第三方http请求

// 添加路由前缀
router.prefix('/api/weapp');

// 获取微信登录信息
const wxAuth = async (req) => {

    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${weApp.APP_ID}&secret=${weApp.SECRET}&js_code=${req.code}&grant_type=authorization_code`;

    return await koa2Req({
        url: url
    });
};

/**
 * 解密微信步数
 */
router.post('/getRunData', async (ctx, next) => {
    let res = getRunData(ctx.request.body);
    ctx.body = {
        code: 200,
        success: true,
        message: 'ok',
        data: res
    };
});

/*
 *
 * */
router.post('/auth', async (ctx, next) => {
    let res = await wxAuth(ctx.request.body);
    console.log('res', JSON.parse(res.body));
    ctx.body = {
        code: 0,
        message: '登录成功',
        data: JSON.parse(res.body)
    };
    // ctx.body = {
    //     errcode: 10000,
    //     msg: 'auth fail',
    // };
});

module.exports = router;
