const config = {
    // 本地
    // database: {
    //     url: 'mongodb-srv://admin:root@shop-p0l56.gcp.mongodb.net',
    //     port: '27017',
    //     name: 'dumall',
    // },
    wxApp: {
        APPID: 'wx7db9d1d26deed64d',
        SECRET: '36150865d5fe6410bd58790bbbffa0d8',
    },
    // 线上
    database: {
        url: 'mongodb://blog.forguo.com',
        port: '27017',
        name: 'wedding',
    },
};

module.exports = config;
