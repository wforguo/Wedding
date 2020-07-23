import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, Text, View } from '@tarojs/components'
import './index.scss'

class Photo extends Component {
    state = {
        canIUse: Taro.canIUse('button.open-type.getUserInfo')
    };

    componentWillUnmount() {
        // 查看是否授权
        Taro.getSetting({
            success (res){
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    Taro.getUserInfo({
                        success: function(user) {
                            console.log(user.userInfo)
                        }
                    })
                }
            }
        })
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    // 获取用户信息
    handleGetUserInfo = (e) => {
        console.log(e.detail.userInfo)
    };

    render() {
        const {
            canIUse
        } = this.state;
        return (
            <View className='get-user-info'>
                {
                    canIUse ?
                    <Button open-type='getUserInfo' onGetUserInfo={this.handleGetUserInfo.bind(this)}>点击登录</Button>
                        :
                    <View>请升级微信版本</View>
                }
            </View>
        )
    }
}

export default Photo

