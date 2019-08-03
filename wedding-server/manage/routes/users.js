const router = require('koa-router')();
const config = require('../../config');
const mongoose = require('mongoose');
const Album = require('../../models/album');
const User = require('../../models/user');
require('./../../util/util');

//连接MongoDB数据库
mongoose.connect(`${config.database.url}:${config.database.port}/${config.database.name}`, { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://admin:root@shop-p0l56.gcp.mongodb.net/dumall?retryWrites=true&w=majority', { useNewUrlParser: true });
// mongoose.connect('mongodb+srv://root:admin@cluster0-acqfy.azure.mongodb.net/wedding?retryWrites=true&w=majority', { useNewUrlParser: true });
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
router.post('/manage/album/list', async (ctx, next) => {
  let request = ctx.request.body;
  console.log(request)
  let page = request.page || 0;
  let pageSize = request.pageSize || 10;
  let skip = (page - 1) * pageSize;
  let params = {};
  let res = await Album.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
    console.log(error);
    ctx.body = {
      errcode: 10086,
      msg: 'error',
      result: error
    };
  });
  console.log(res);
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
router.get('/manage/album/list', async (ctx, next) => {
  let query = ctx.request.query; // if nothing to pass just return a {}
  let page = query.page || 0;
  let pageSize = query.page.pageSize || 10;
  let skip = (page - 1) * 10;
  let params = {};
  let res = await Album.find(params).skip(Number(skip)).limit(Number(pageSize)).catch(error => {
    ctx.body = {
      errcode: 10086,
      msg: 'error',
      result: error
    };
  });
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
router.post('/manage/album/add', async (ctx, next) => {
  if (!ctx.request.body || ctx.request.body.length === 0) {
    ctx.body = {
      errcode: 10001,
      msg: '参数不能为空',
    };
    return false;
  }
  let url = ctx.request.body.url;
  let desc = ctx.request.body.desc;
  if (!url || url.length === 0) {
    ctx.body = {
      errcode: 10000,
      msg: '图片不能为空',
    };
    return false;
  }
  if (!desc || desc.length === 0) {
    ctx.body = {
      errcode: 10000,
      msg: '图片描述能为空',
    };
    return false;
  }
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
  let res = await album.save().catch(error => {
    ctx.body = {
      errcode: 10086,
      msg: 'error',
      result: error
    };
  });
  ctx.body = {
    errcode: 0,
    msg: 'ok',
    result: res
  };
})

/**
 * add照片
 */
router.get('/manage/album/add', async (ctx, next) => {
  if (!ctx.request.query || ctx.request.query === 0) {
    ctx.body = {
      errcode: 10001,
      msg: '参数不能为空',
    };
    return false;
  }

  let query = ctx.request.query; // if nothing to pass just return a {}
  let url = query.url;
  let desc = query.desc;
  if (!url || url.length === 0) {
    ctx.body = {
      errcode: 10000,
      msg: '图片不能为空',
    };
    return false;
  }
  if (!desc || desc.length === 0) {
    ctx.body = {
      errcode: 10000,
      msg: '图片描述能为空',
    };
    return false;
  }
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
  let res = await album.save().catch(error => {
    ctx.body = {
      errcode: 10086,
      msg: 'error',
      result: error
    };
  });
  ctx.body = {
    errcode: 0,
    msg: 'ok',
    result: res
  };
})

/**
 * 删除照片
 */
router.post('/manage/album/del', async (ctx, next) => {
  let id = ctx.request.body.id || '';
  let res = await Album.deleteOne({'id': id}).catch(error => {
    ctx.body = {
      errcode: 10086,
      msg: 'error',
      result: error
    };
  });
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
router.get('/manage/album/del', async (ctx, next) => {
  let query = ctx.request.query; // if nothing to pass just return a {}
  let id = query.id || '';
  let res = await Album.deleteOne({'id': id}).catch(error => {
    ctx.body = {
      errcode: 10086,
      msg: 'error',
      result: error
    };
  });
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
