import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Text, View} from '@tarojs/components'

import {add, asyncAdd, minus} from '../../store/actions/counter'

import './index.scss'


@connect(({counter}) => ({
    counter
}), (dispatch) => ({
    add() {
        dispatch(add())
    },
    dec() {
        dispatch(minus())
    },
    asyncAdd() {
        dispatch(asyncAdd())
    }
}))
class Index extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    handleSendMessage = () => {
        Taro.requestSubscribeMessage({
            tmplIds: ['MBr6PdwADfv8OIltON6gD7qMiiNQrQhUa4ocMsRe2rE'],
            success(res) {
                console.log(res);
            }
        })
    };

    render() {
        return (
            <View className='index index-page'>
                <Button className='add_btn' onClick={this.props.add}>+</Button>
                <Button className='dec_btn' onClick={this.props.dec}>-</Button>
                <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
                <View><Text>{this.props.counter.num}</Text></View>
                <View><Text>Hello, World</Text></View>
                <Button className='send-btn' onClick={this.handleSendMessage.bind(this)}>发送模板消息</Button>
            </View>
        )
    }
}

export default Index

