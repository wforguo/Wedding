import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configStore from './store'
import './common/css/app.scss'

const store = configStore();

// app中的生命周期只会执行一次
class App extends Component {
    componentWillMount() {
        this.getSystemInfo();
        this.checkVersion();
    }

    componentDidMount() {
        console.log(store.getState());
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    componentDidCatchError() {
    }

    // 获取系统信息
    getSystemInfo = () => {
        let systemInfo = Taro.getSystemInfoSync() || {};
        let menuButtonInfo = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
        if (!systemInfo.statusBarHeight) {
            systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
        }
        Taro.systemInfo = systemInfo;
        Taro.menuButtonInfo = menuButtonInfo || {};
        return systemInfo;
    };

    // 版本管理
    checkVersion = () => {
        if (Taro.canIUse('getUpdateManager')) {
            const updateManager = Taro.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function () {
                        Taro.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，点击体验最新功能~',
                            showCancel: false,
                            success:  (modalRes) => {
                                // res: {errMsg: 'showModal: ok', cancel: false, confirm: true}
                                if (modalRes.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    });
                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                        Taro.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦，请您删除当前小程序，重新搜索打开哟~',
                            showCancel: false,
                        })
                    })
                }
            })
        } else {
            Taro.showModal({
                title: '提示',
                confirmColor: '#5BB53C',
                content: '当前微信版本过低，请升级到最新微信版本后重新打开小程序~',
                showCancel: false,
            })
        }
    };

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        )
    }
}

export default App
