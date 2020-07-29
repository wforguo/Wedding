/**
 * @Description: 集成中间件
 * @author: forguo
 * @date: 2020/7/29
*/

const views = require('koa-views');
const json = require('koa-json');
const helmet = require("koa-helmet");
const koaBodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const compose = require('koa-compose');

const cors = require('./cors');
const jwt = require('./jwt');
const errHandle = require('./ErrHandle');
/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
    logger(),
    koaBodyParser({
        enableTypes: ['json', 'form', 'text']
    }),
    json(),
    require('koa-static')(__dirname + '/public'),
    views(__dirname + '/views', {
        extension: 'pug'
    }),
    cors,
    helmet(),
    errHandle,
    jwt
]);

module.exports = middleware;
