import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Image, Text, View } from '@tarojs/components'
import './index.scss'

class Index extends Component {
    state = {

    };

    render() {
        return (
            <View className='page invite'>
                <Image className='invite-img' src='https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/invite.jpg' />
            </View>
        )
    }
    onShareAppMessage () {
        return {
            title: '诚邀您参加XXX的婚礼',
            // path: '/page/user?id=123',
            // imageUrl: ''
        }
    }
}

export default Index

