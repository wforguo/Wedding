/**
 * @Description: 数据库操作
 * @author: forguo
 * @date: 2020/7/29
 */
const mongoose = require('mongoose');
const chalk = require('chalk');
const config = require('../config');

const dbConnect = () => {

    /******************
     * 数据库连接 Start
     * ***************/

    // 数据库配置
    const dataBase = config.dataBase;

    // 数据库连接字符串
    // const dbStr = `mongodb://${config.dataBase.user}:${config.dataBase.pwd}@${config.dataBase.url}:${config.dataBase.port}/${config.dataBase.name}?authSource=admin`;
    const dbStr = `${dataBase.pre}${dataBase.user}:${dataBase.pwd}@${dataBase.url}/${dataBase.name}?retryWrites=true&w=majority&authSource=admin&ssl=true`;
    console.log(chalk.magenta(dbStr));
    console.log(chalk.blue(`MongoDB connected start! \n`));

    // 连接MongoDB数据库
    mongoose.connect(dbStr, {useNewUrlParser: true, useUnifiedTopology: true});

    mongoose.connection.on('connected', function (e) {
        console.log(chalk.green(`\nMongoDB connected success~ \n`));
    });

    mongoose.connection.on('error', function () {
        console.log(chalk.red(`MongoDB connected fail! \n`));
    });

    mongoose.connection.on('disconnected', function () {
        console.log(chalk.red(`MongoDB connected disconnected! \n`));
    });

    /******************
     * 数据库连接 End
     * ***************/
};

module.exports = dbConnect;
