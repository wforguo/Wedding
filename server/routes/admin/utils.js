/**
 * @Description: 工具类
 * @author: forguo
 * @date: 2020/7/14
 */
const router = require('koa-router')();
const fs = require('fs');

/**
 * 图片上传
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
