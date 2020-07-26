import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Button, Text, View } from '@tarojs/components'
import './index.scss'

class Index extends Component {

    onTabItemTap() {
        Taro.vibrateShort();
    }

    // 发送模板消息
    handleSendMessage = () => {
        Taro.requestSubscribeMessage({
            tmplIds: ['MBr6PdwADfv8OIltON6gD7qMiiNQrQhUa4ocMsRe2rE'],
            success(res) {
                console.log(res);
            }
        })
    };

    loading = false;

    render() {
        return (
            <View className='page index'>
                <View><Text>Hello, World</Text></View>
                <Button className='send-btn' onClick={this.handleSendMessage.bind(this)}>发送模板消息</Button>
            </View>
        )
    }
}

export default Index

