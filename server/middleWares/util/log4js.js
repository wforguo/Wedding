// log4js.js
const log4js = require('log4js');
const {formatError, formatRes} = require('./formatLog');
let logger = {};

let errorLogger = log4js.getLogger('error');
let resLogger = log4js.getLogger('response');

// 封装错误日志
logger.errLogger = (ctx, error, resTime) => {
    if(ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime))
    }
};

// 封装响应日志
logger.resLogger = (ctx, resTime) => {
    if(ctx) {
        resLogger.info(formatRes(ctx, resTime))
    }
};
