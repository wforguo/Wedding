/**
 * @Description 婚礼信息
 * @Author forguo
 * @Date 2019/12/14
 */

const router = require('koa-router')();
const Invite = require('../../models/Invite');

// 添加路由前缀
router.prefix('/api/invite');

/**
 * 获取信息（get方式）
 */
router.get('/info', async (ctx, next) => {
    let res = await Invite.find().catch(error => {
        ctx.body = {
            success: false,
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        message: 'ok',
        data: res[0],
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
    const { body: params } = ctx.request;
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let platform = 'invite';
    let r1 = Math.floor(Math.random() * 10);
    let r2 = Math.floor(Math.random() * 10);

    let sysDate = new Date().Format('yyyyMMddhhmmss');
    params.id = platform + r1 + sysDate + r2;
    params.createTime = createTime;
    params.updateTime = createTime;
    let res = await Invite.create(params).catch(error => {
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
    const { body: params } = ctx.request;
    let res = null;
    console.log(params);
    if (!_id) {
        delete params._id;
        let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
        let platform = 'invite';
        let r1 = Math.floor(Math.random() * 10);
        let r2 = Math.floor(Math.random() * 10);
    
        let sysDate = new Date().Format('yyyyMMddhhmmss');
        params.id = platform + r1 + sysDate + r2;
        params.createTime = createTime;
        params.updateTime = createTime;
        res = await Invite.create(params).catch(error => {
            ctx.body = {
                code: 10086,
                success: false,
                message: error.message
            };
        });
    } else {
        params.updateTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
        res = await Invite.update({
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
    }
    ctx.body = {
        code: 200,
        success: true,
        message: 'ok',
        data: res
    };
});

module.exports = router;
