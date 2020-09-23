/**
 * @Description 相册
 * @Author forguo
 * @Date 2019/12/14
 */

const router = require('koa-router')();
const { v4: uuidv4 } = require('uuid');
const Photo = require('../../models/Photo');

// 添加路由前缀
router.prefix('/api/photo');

/**
 * 获取照片列表（get方式）
 */
router.get('/list', async (ctx, next) => {
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

    let total = await Photo.count(params);
    if (total > 0) {
        let res = await Photo.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
            ctx.body = {
                success: false,
                code: 10086,
                message: error.message
            };
        });
        ctx.body = {
            code: 200,
            success: true,
            message: 'ok',
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

/**
 * 添加照片
 */
router.post('/add', async (ctx, next) => {
    if (!ctx.request.body || ctx.request.body.length === 0) {
        ctx.body = {
            code: 10001,
            message: '参数不能为空',
        };
        return false;
    }
    const {body} = ctx.request;
    let {
        desc,
        url,
    } = body;
    if (!desc || desc.length === 0) {
        ctx.body = {
            code: 10000,
            message: '图片描述能为空',
        };
        return false;
    }
    if (!url || url.length === 0) {
        ctx.body = {
            code: 10000,
            message: '图片不能为空',
        };
        return false;
    }
    let createTime = new Date().Format('yyyy/MM/dd hh:mm:ss');
    let photo = {
        id: `photo-${uuidv4()}`,
        url: url,
        desc: desc,
        createTime,
    };
    let res = await Photo.create(photo).catch(error => {
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
 * 删除照片
 */
router.get('/remove', async (ctx, next) => {
    let _id = ctx.request.query._id || '';
    if (!_id) {
        ctx.body = {
            code: 10000,
            message: '照片不存在',
        };
        return false;
    }
    console.log('_id ===>', _id);
    // deleteOne({_id});
    let res = await Photo.findByIdAndRemove(_id).catch(error => {
        ctx.body = {
            code: 10086,
            message: error.message
        };
    });
    ctx.body = {
        code: 200,
        success: true,
        message: 'ok',
        data: {
            _id,
            res: res
        }
    };
});

module.exports = router;
