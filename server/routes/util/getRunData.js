/**
 * @Description: 微信步数解密
 * @author: forguo
 * @date: 2020/7/15
 */
let WXBizDataCrypt = require('./WXBizDataCrypt');
let config = require('../../config');
let weApp = config.weApp;

module.exports =
    getRunData = function (params) {
        let pc = new WXBizDataCrypt(weApp.APP_ID, params.sessionKey);
        return pc.decryptData(params.encryptedData, params.iv);
    };
