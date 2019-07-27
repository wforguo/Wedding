const router = require('koa-router')();
const config = require('../../config');
const mongoose = require('mongoose');
const Album = require('../../models/album');
require('./../../util/util');

//连接MongoDB数据库
// mongoose.connect(`${config.database.url}:${config.database.port}/${config.database.name}`, { useNewUrlParser: true });
mongoose.connect('mongodb+srv://admin:root@shop-p0l56.gcp.mongodb.net/dumall?retryWrites=true&w=majority', { useNewUrlParser: true });

mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});

/**
 *
 */
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello World!'
  })
})

/**
 * post照片列表
 */
router.post('/wedding/album/list', async (ctx, next) => {
    let request = ctx.request.body;
    let page = request.page;
    let pageSize = 10;
    let skip = (page - 1) * request.pageSize;
    let params = {};
    let res = await Album.find(params).skip(skip).limit(pageSize);
    ctx.body = {
        errcode: 0,
        msg: 'ok',
        result:{
            count: res.length,
            list: res
        }
    };
})


/**
 * get照片列表
 */
router.get('/wedding/album/list', async (ctx, next) => {
    let query = ctx.request.query; // if nothing to pass just return a {}
    let page = query.page || 0;
    let pageSize = query.page.pageSize || 10;
    let skip = (page - 1) * 10;
    let params = {};
    let res = await Album.find(params).skip(skip).limit(pageSize);
    ctx.body = {
        errcode: 0,
        msg: 'ok',
        result:{
            count: res.length,
            list: res
        }
    };
})

/**
 * add照片
 */
router.post('/wedding/album/add', async (ctx, next) => {
    let url = ctx.request.body.url || '';
    let desc = ctx.request.body.desc || '';
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let platform = 'album';
    let r1 = Math.floor(Math.random()*10);
    let r2 = Math.floor(Math.random()*10);

    let sysDate = new Date().Format('yyyyMMddhhmmss');
    let id = platform + r1 + sysDate + r2;
    let album = new Album({
        id: id,
        url: url,
        desc: desc,
        time: createTime
    });
    let res = await album.save();
    ctx.body = {
        errcode: 0,
        msg: 'ok',
        result: res
    };
})

/**
 * add照片
 */
router.get('/wedding/album/add', async (ctx, next) => {
    let query = ctx.request.query; // if nothing to pass just return a {}
    let url = query.url || '';
    let desc = query.desc || '';
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let platform = 'album';
    let r1 = Math.floor(Math.random()*10);
    let r2 = Math.floor(Math.random()*10);

    let sysDate = new Date().Format('yyyyMMddhhmmss');
    let id = platform + r1 + sysDate + r2;
    console.log(id);
    let album = new Album({
        id: id,
        url: url,
        desc: desc,
        time: createTime
    });
    let res = await album.save();
    ctx.body = {
        errcode: 0,
        msg: 'ok',
        result: res
    };
})

/**
 * 删除照片
 */
router.post('/wedding/album/del', async (ctx, next) => {
    let id = ctx.request.body.id || '';
    let res = await Album.deleteOne({'id': id});
    console.log(res);
    ctx.body = {
        errcode: 0,
        msg: 'ok',
        result:{
            res: res
        }
    };
})

/**
 * 删除照片
 */
router.get('/wedding/album/del', async (ctx, next) => {
    let query = ctx.request.query; // if nothing to pass just return a {}
    let id = query.id || '';
    let res = await Album.deleteOne({'id': id});
    console.log(res);
    ctx.body = {
        errcode: 0,
        msg: 'ok',
        result:{
            res: res
        }
    };
})

module.exports = router
