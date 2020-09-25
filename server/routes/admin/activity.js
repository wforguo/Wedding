/**
 * @Description 活动管理
 * @Author forguo
 * @Date 2019/12/14
 */

const router = require('koa-router')();
const { v4: uuidv4 } = require('uuid');
const Activity = require('../../models/Activity');
const Member = require('../../models/Member');
const log4js = require('./../../middleWares/util/log4js');

// 添加路由前缀
router.prefix('/api/activity');

/**
 * 获取列表（get方式）
 */
router.get('/list', async (ctx, next) => {
    log4js.errLogger(ctx, 'err');
    let query = ctx.request.query; // if nothing to pass just return a {}
    let current = query.current || 1;
    let pageSize = query.pageSize || 10;
    let skip = (current - 1) * pageSize;
    console.log(ctx.header);
    // 条件检索
    let params = {
        ...query
    };
    delete params.current;
    delete params.pageSize;
    delete params.sorter;
    delete params._timestamp;

    let total = await Activity.count(params);
    if (total > 0) {
        let res = await Activity.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
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
            total,
            'success': true,
            'pageSize': pageSize || 10,
            'current': current || 1
        };
    } else {
        ctx.body = {
            code: 200,
            message: 'ok',
            data: [],
            total,
            'success': true,
            'pageSize': pageSize || 10,
            'current': current || 1
        };
    }
});

/**
* 获取信息（get方式）
*/
router.get('/detail', async (ctx, next) => {
    let query = ctx.request.query;
    let id = query.actId;
    if (!id || id.length === 0) {
        ctx.body = {
            code: 10009,
            success: false,
            message: 'id不能为空',
        };
        return false;
    }

    let param = {
        id: id
    };
    let res = await Activity.find(param).catch(error => {
        ctx.body = {
            success: false,
            code: 10086,
            message: error.message
        };
    });
    if (!res || res.length <= 0) {
        ctx.body = {
            code: 10010,
            success: false,
            message: '活动不存在',
        };
    } else {
        ctx.body = {
            code: 200,
            success: true,
            message: 'ok',
            data: res
        };
    }
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
    const { body } = ctx.request;
    let {
        title,
    } = body;
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let activity = {
        id: `activity-${uuidv4()}`,
        title,
        createTime,
        updateTime: createTime
    };
    let res = await Activity.create(activity).catch(error => {
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

/**
 * 修改
 */
router.post('/update', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            message: '参数不能为空',
        };
        return false;
    }
    const { body } = ctx.request;
    let {
        id,
        title,
    } = body;
    let updateTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let res = await Activity.update({
        id
    }, {
        $set: {
            title,
            updateTime,
        }
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

/**
 * 删除
 */
router.get('/remove', async (ctx, next) => {
    let _id = ctx.request.query._id || '';
    if (!_id) {
        ctx.body = {
            code: 10000,
            message: '活动不存在',
        };
        return false;
    }
    console.log('_id ===>', _id);
    // deleteOne({_id});
    let res = await Activity.findByIdAndRemove(_id).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        message: 'ok',
        data: {
            _id,
            res: res
        }
    };
});

/**
 * 报名
 */
router.post('/signUp', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            message: '参数不能为空',
        };
        return false;
    }
    const { body } = ctx.request;
    let {
        actId,
        formData
    } = body;
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let member = {
        actId,
        createTime,
        updateTime: createTime,
        formData: {
            name: Math.random() * Math.random(),
            email: uuidv4()
        }
    };
    let res = await Member.create(member).catch(error => {
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


/**
 * 获取报名成员（get方式）
 */
router.get('/member', async (ctx, next) => {
    let query = ctx.request.query; // if nothing to pass just return a {}
    let current = query.current || 1;
    let pageSize = query.pageSize || 10;
    let skip = (current - 1) * pageSize;

    // 条件检索
    let params = {
        ...query
    };
    delete params.current;
    delete params.pageSize;
    delete params.sorter;
    delete params._timestamp;

    let total = await Member.count(params);
    if (total > 0) {
        let res = await Member.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
            ctx.body = {
                success: false,
                code: 10086,
                message: error.message
            };
        });
        ctx.body = {
            code: 200,
            message: 'ok',
            success: true,
            data: res,
            total,
            'pageSize': pageSize || 10,
            'current': current || 1
        };
    } else {
        ctx.body = {
            code: 0,
            success: true,
            message: 'ok',
            data: [],
            total,
            'pageSize': pageSize || 10,
            'current': current || 1
        };
    }
});

module.exports = router;
