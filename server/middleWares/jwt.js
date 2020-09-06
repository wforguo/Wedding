/**
 * @Description: jwt登录鉴权
 * @author: forguo
 * @date: 2020/7/28
*/

const JWT = require('koa-jwt');
const config = require('../config');
/**
 *  定义公共的路径，不需要jwt鉴权
 */
const jwt = JWT({
    secret: config.JWT_SECRET
}).unless({
    path: [
        /^\/public/, // 公共模块
        /^\/api\/auth/, // 登录模块
        /^\/weapp/ // 微信小程序
    ] // 该prefix下的不做校验
});

module.exports = jwt;
