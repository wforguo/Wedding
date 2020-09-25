/**
 * @Description: 跨域处理
 * @author: forguo
 * @date: 2020/7/28
*/
const cors = async (ctx, next) => {
    // 设置跨域
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'X-Auth-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
    } else {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    }
};

module.exports = cors;
