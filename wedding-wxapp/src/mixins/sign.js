import wepy from 'wepy';

const MOBILE_REG = /^1([23456789])\d{9}$/;
export default class signMixin extends wepy.mixin {
    data = {
        mixin: 'This is mixin data.'
    };

    /**
     * 手机号验证
     * @param mobile
     * @returns {boolean}
     */

    checkMobile(mobile) {
        if (!mobile) {
            wx.showToast({
                title: '请输入手机号码',
                icon: 'none'
            });
            return false;
        } else if (!MOBILE_REG.test(mobile)) {
            wx.showToast({
                title: '请输入正确的手机号码',
                icon: 'none'
            });
            return false;
        }
        return true;
    }

    methods = {};

    onShow() {
    }

    onLoad() {
    }
}
