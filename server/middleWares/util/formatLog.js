/**
 * @Description: 格式化日志
 * @author: forguo
 * @date: 2020/9/25
*/
// formatLog.js
let formatError = (ctx, err, costTime) => {
    let method = ctx.method;
    let url = ctx.url;
    let body = ctx.request.body;
    let userAgent = ctx.header.userAgent;
    return {method, url, body, costTime, err, userAgent}
};

let formatRes = (ctx,costTime) => {
    let method = ctx.method;
    let url = ctx.url;
    let body = ctx.request.body;
    let response = ctx.response;
    return {method, url, body, costTime, response}
};

module.exports = {
    formatError,
    formatRes
};
