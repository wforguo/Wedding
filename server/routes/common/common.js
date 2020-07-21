/**
 * @Description: 常用的接口
 * @author: forguo
 * @date: 2020/7/21
 */

const router = require('koa-router')();
const fs = require('fs');
const ip = require('ip');
const config = require('../../config');
const cosConfig = config.cosConfig;

// COS实例
const COS = require('cos-nodejs-sdk-v5');
const cos = new COS({
    // 必选参数
    SecretId: cosConfig.COS_SECRET_ID,
    SecretKey: cosConfig.COS_SECRET_KEY,
    // 可选参数
    FileParallelLimit: 3,    // 控制文件上传并发数
    ChunkParallelLimit: 5,   // 控制单个文件下分片上传并发数，在同园区上传可以设置较大的并发数
    ChunkSize: 1024 * 1024 * 5,  // 控制分片大小，单位 B，在同园区上传可以设置较大的分片大小
    Proxy: '',
});

// 添加路由前缀
router.prefix('/api/common');

// COS上传
function putObject (file) {
    const fileName = file.name;
    const fileSize = file.size;
    const body = fs.createReadStream(file.path);	// 创建可读流
    return new Promise((resolve, reject) => {
        cos.putObject({
            Bucket: cosConfig.COS_BUCKET, /* 必须 */
            Region: cosConfig.COS_REGION, /* 必须 */
            Key: fileName,                /* 必须 */
            StorageClass: 'STANDARD',
            // 格式1. 传入文件内容
            // Body: fs.readFileSync(filepath),
            // 格式2. 传入文件流，必须需要传文件大小
            Body: body, // 上传文件对象
            ContentLength: fileSize,
            onTaskReady: function (tid) {
                // console.log('TaskId', tid);
                // TaskId = tid;
            },
            onProgress: function (progressData) {
                // console.log('progressData', JSON.stringify(progressData));
            },
        }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        });
    });
};

/**
 * 图片上传 COS方式
 * */
router.post('/imgUpload', async (ctx, next) => {
    const file = ctx.request.files.file; // 获取上传文件
    try {
        let res = await putObject(file);
        console.log(res);
        ctx.body = {
            code: 200,
            success: true,
            message: 'ok',
            data: res
        };
    } catch (err) {
        console.log(err);
        ctx.body = {
            code: 10086,
            success: false,
            message: 'fail',
            data: err
        };
    }
});

/**
 * 图片上传 fs方式
 */
router.post('/upload', async (ctx, next) => {
    const file = ctx.request.files.file;	// 获取上传文件
    const reader = fs.createReadStream(file.path);	// 创建可读流
    const ext = file.name.split('.').pop();		// 获取上传文件扩展名
    const upStream = fs.createWriteStream(`public/upload/${Math.random().toString()}.${ext}`);		// 创建可写流
    let res = await reader.pipe(upStream);	// 可读流通过管道写入可写流
    if (res) {
        return ctx.body = {
            url: `http://${ip.address()}:3000${res.path.substr(6, res.path.length)}`,
            code: 0,
            success: true,
            msg: '上传成功',
        };
    }
});

module.exports = router;
