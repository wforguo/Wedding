/**
 * @Description: jwt 错误鉴权处理
 * @author: forguo
 * @date: 2020/7/25
 */
function ErrHandle(ctx, next) {
    // 拦截用户非法请求
    return next().catch(err => {
        console.log('AuthErr ===>', JSON.stringify(err));
        if (401 === err.status) {
            ctx.status = 401;
            ctx.body = {
                code: 401,
                msg: err.message
            }
        } else {
            throw err;
        }
    });
}

module.exports = ErrHandle;
