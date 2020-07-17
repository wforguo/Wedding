/**
 * @Description: 微信步数解密
 * @author: forguo
 * @date: 2020/7/15
 */
let WXBizDataCrypt = require('./WXBizDataCrypt');
let config = require('../../config');
let wxApp = config.wxApp;

module.exports =
    getRunData = function (params) {
        let pc = new WXBizDataCrypt(wxApp.APPID, params.sessionKey);
        return pc.decryptData(params.encryptedData, params.iv);
    };
