const router = require('koa-router')();
const config = require('../../config');
const mongoose = require('mongoose');
const Goods = require('../../models/goods');

//连接MongoDB数据库
mongoose.connect(`${config.database.url}:${config.database.port}/${config.database.name}`, { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://admin:root@shop-p0l56.gcp.mongodb.net/dumall?retryWrites=true&w=majority', { useNewUrlParser: true });

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
 * post商品列表
 */
router.post('/getList', async (ctx, next) => {
    console.log(JSON.stringify(ctx.request.body))
    let request = ctx.request.body;
    let page = request.page;
    let pageSize = 10;
    let skip = (page - 1) * request.pageSize;
    let params = {};
    let res = await Goods.find(params).skip(skip).limit(pageSize);
    ctx.body = {
        errcode: 0,
        msg: '登录成功',
        result:{
            count: res.length,
            list: res
        }
    };
    // let res = goodsModel.exec(function (err,doc) {
    //     console.log(err);
    //     if(err){
    //         ctx.body = {
    //             errcode: 10000,
    //             msg: err.errmsg
    //         }
    //     } else{
    //         ctx.body = {
    //             errcode: 0,
    //             msg: '登录成功',
    //             result:{
    //                 count:doc.length,
    //                 list:doc
    //             }
    //         };
    //     }
    // });
})


/**
 * get商品列表
 */
router.get('/getList', async (ctx, next) => {
    console.log(JSON.stringify(ctx.request))
    let request = ctx.request.body;
    let page = request.page;
    let pageSize = 10;
    let skip = (page - 1) * request.pageSize;
    let params = {};
    let res = await Goods.find(params).skip(skip).limit(pageSize);
    ctx.body = {
        errcode: 0,
        msg: '登录成功',
        result:{
            count: res.length,
            list: res
        }
    };
})
module.exports = router
