
/**
 * @Description 视频
 * @Author forguo
 * @Date 2019/12/14
 */
const router = require('koa-router')();
const { v4: uuidv4 } = require('uuid');
const Video = require('../../models/Video');

// 添加路由前缀
router.prefix('/api/video');

/**
 * 获取信息（get方式）
 */
router.get('/info', async (ctx, next) => {
    let res = await Video.find().catch(error => {
        ctx.body = {
            success: false,
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        message: 'ok',
        data: res,
        'success': true,
    };
});

/**
 * 添加
 */
router.post('/add', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            message: '参数不能为空',
        };
        return false;
    }
    const {body: params} = ctx.request;
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    params.id = `video-${uuidv4()}`;
    params.createTime = createTime;
    params.updateTime = createTime;
    let res = await Video.create(params).catch(error => {
        ctx.body = {
            code: 10086,
            success: false,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        success: false,
        message: 'ok',
        data: res
    };
});

/**
 * 更新信息
 */
router.post('/update', async (ctx, next) => {
    let _id = ctx.request.body._id || '';
    if (!_id) {
        ctx.body = {
            code: 10000,
            message: '记录不存在',
        };
        return false;
    }
    const {body: params} = ctx.request;
    console.log('_id ===>', _id, params);
    params.updateTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let res = await Video.update({
        _id
    }, {
        $set: params
    }).catch(error => {
        ctx.body = {
            code: 10086,
            success: false,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        success: true,
        message: 'ok',
        data: res
    };
});

module.exports = router;
