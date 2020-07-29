/**
 * @Description: 集成中间件
 * @author: forguo
 * @date: 2020/7/29
*/

const path = require('path');
const views = require('koa-views');
const json = require('koa-json');
const helmet = require("koa-helmet");
// const koaBodyParser = require('koa-bodyparser');
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
    koaBody({
        multipart:true, // 支持文件上传
        // encoding: 'gzip',
        formidable:{
            uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
            keepExtensions: true,    // 保持文件的后缀
            maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
            onFileBegin:(name,file) => { // 文件上传前的设置
                // console.log(`name: ${name}`);
                // console.log(file);
            },
        }
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
