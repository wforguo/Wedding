import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, Text, View } from '@tarojs/components'
import './index.scss'

class Photo extends Component {
    state = {
    };

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }


    render() {
        return (
            <View className='page photo'>
                甜蜜相册
            </View>
        )
    }
}

export default Photo

