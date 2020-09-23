const config = {
    port: '3333', // 服务端口
    JWT_SECRET: '7b7ae37c-ae51-4d4f-b4bd-ffbe4c119664', // uuid
    /**
     * 数据库配置
     * */
    dataBase: {
        // dbStr: 'mongodb+srv://admin:root2333@forguo.kqpcs.gcp.mongodb.net/wedding?retryWrites=true&w=majority&authSource=admin&ssl=true'
        pre: 'mongodb+srv://',
        user: 'admin',
        pwd: 'root2333', // root2333
        url: 'forguo.kqpcs.gcp.mongodb.net',
        port: '27017',
        name: 'activity',
    },
    // 本地
    // dataBase: {
    //     pre: 'mongodb://',
    //     user: 'admin',
    //     pwd: '2333!',
    //     url: '106.12.182.39',
    //     port: '27019',
    //     name: 'wedding',
    // },
    /**
     * 小程序配置
     * */
    weApp: {
        APP_ID: 'wx7db9d1d26deed64d',
        SECRET: '36150865d5fe6410bd58790bbbffa0d8',
    },
    /**
     * COS配置
     * */
    cosConfig: {
        COS_SECRET_ID: 'SecretId', // 用户的 SecretId
        COS_SECRET_KEY: 'SecretKey', // 用户的 SecretKey
        COS_BUCKET: 'forguo-1302175274', // 存储桶名称
        COS_REGION: 'ap-shanghai', // 地域
        COS_DO_MAIN: 'forguo-1302175274.cos.ap-shanghai.myqcloud.com' // 存储桶域名
    }
};

module.exports = config;
