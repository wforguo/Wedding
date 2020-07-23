import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, Text, View, Video } from '@tarojs/components'
import './index.scss'

class Bless extends Component {
    state = {
    };

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    // 送上留言祝福
    handleSendBless = () => {

    };

    // 分享喜悦
    handleShare = () => {

    };

    render() {
        return (
            <View className='page bless'>
                <View className='bless-media'>
                    <Video
                      src='https://666f-forguo-0979a1-1251886253.tcb.qcloud.la/wxapp/wedding/static/girl.mp4?sign=82606071afbc37ec98646dd632b8675c&t=1562941106'
                    />
                </View>
                <View className='bless-tool'>
                    <View className='bless-tool_send-msg' onClick={this.handleSendBless.bind(this)}>送上祝福</View>
                    <View className='bless-tool_share' onClick={this.handleShare.bind(this)}>分享喜悦</View>
                </View>
            </View>
        )
    }
}

export default Bless

