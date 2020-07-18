const config = {
    wxApp: {
        APPID: 'wx7db9d1d26deed64d',
        SECRET: '36150865d5fe6410bd58790bbbffa0d8',
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
    dataBase: {
        // dbStr: 'mongodb+srv://admin:root2333@forguo.kqpcs.gcp.mongodb.net/wedding?retryWrites=true&w=majority&authSource=admin&ssl=true'
        pre: 'mongodb+srv://',
        user: 'admin',
        pwd: 'root2333', // root2333
        url: 'forguo.kqpcs.gcp.mongodb.net',
        port: '27017',
        name: 'wedding',
    },
};

module.exports = config;
