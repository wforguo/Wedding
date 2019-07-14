let WXBizDataCrypt = require('./WXBizDataCrypt');
let config = require('./../config');
let wxApp = config.wxApp;

module.exports =
    getRunData = function(params) {
        let pc = new WXBizDataCrypt(wxApp.APPID, params.sessionKey);
        return pc.decryptData(params.encryptedData , params.iv);
    };
