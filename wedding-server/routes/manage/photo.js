/**
 * @Description 管理系统相关接口
 * @Author forguo
 * @Date 2019/12/14
 */

const router = require('koa-router')();
const config = require('../../config');
const mongoose = require('mongoose');
const Photo = require('../../models/photo');
require('../../util/util');

// 数据库连接字符串
const dbStr = `mongodb://${config.database.user}:${config.database.pwd}@${config.database.url}:${config.database.port}/${config.database.name}?authSource=admin`;
console.log(dbStr);

// 连接MongoDB数据库
mongoose.connect(dbStr, {useNewUrlParser: true});

// mongodb://admin:2333!@106.12.182.39:27019/wedding?readPreference=primary&appname=MongoDB%20Compass&ssl=false
mongoose.connection.on("connected", function () {
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
    console.log("MongoDB connected disconnected.")
});

// 添加路由前缀
router.prefix('/manage');

/**
 * /
 */
router.get('/', async (ctx, next) => {
    await ctx.render('photo.js', {
        title: 'Welcome Wedding!'
    })
})

/**
 * 获取照片列表（post方式）
 */
router.post('/photo/list', async (ctx, next) => {
    let request = ctx.request.body;
    let pageNum = request.pageNum || 1;
    let pageSize = request.pageSize || 10;
    let skip = (pageNum - 1) * pageSize;
    let params = {};
    let res = await Photo.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 0,
        message: 'ok',
        data: {
            count: res.length,
            list: res
        }
    };
})

/**
 * 获取照片列表（get方式）
 */
router.get('/photo/list', async (ctx, next) => {
    let query = ctx.request.query; // if nothing to pass just return a {}
    let pageNum = query.pageNum || 1;
    let pageSize = query.pageSize || 10;
    let skip = (pageNum - 1) * pageSize;
    let params = {};
    let res = await Photo.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 0,
        message: 'ok',
        data: {
            count: res.length,
            list: res
        }
    };
})

/**
 * 添加照片
 */
router.post('/photo/add', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            message: '参数不能为空',
        };
        return false;
    }
    let url = ctx.request.body.url;
    let desc = ctx.request.body.desc;
    if (!url || url.length === 0) {
        ctx.body = {
            code: 10000,
            message: '图片不能为空',
        };
        return false;
    }
    if (!desc || desc.length === 0) {
        ctx.body = {
            code: 10000,
            message: '图片描述能为空',
        };
        return false;
    }
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let platform = 'photo';
    let r1 = Math.floor(Math.random() * 10);
    let r2 = Math.floor(Math.random() * 10);

    let sysDate = new Date().Format('yyyyMMddhhmmss');
    let id = platform + r1 + sysDate + r2;
    let photo = new Photo({
        id: id,
        url: url,
        desc: desc,
        time: createTime
    });
    let res = await photo.save().catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 0,
        message: 'ok',
        data: res
    };
})

/**
 * 删除照片
 */
router.post('/photo/del', async (ctx, next) => {
    let id = ctx.request.body.id || '';
    let res = await Photo.deleteOne({'id': id}).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 0,
        message: 'ok',
        data: {
            res: res
        }
    };
})

module.exports = router
