/**
 * @Description: 格式化日志
 * @author: forguo
 * @date: 2020/9/25
*/
// formatLog.js
let formatError = (ctx, err) => {
    let method = ctx.method;
    let url = ctx.url;
    let body = ctx.request.body;
    let query = ctx.request.query;
    let userAgent = ctx.header['user-agent'];
    let host = ctx.header.host;
    return {method, url, body, query, err, userAgent, host}
};

let formatRes = (ctx,costTime) => {
    let method = ctx.method;
    let url = ctx.url;
    let body = ctx.request.body;
    let query = ctx.request.query;
    let response = ctx.response;
    return {method, url, body, query, costTime, response}
};

module.exports = {
    formatError,
    formatRes
};
