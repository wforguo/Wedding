import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, Text, View } from '@tarojs/components'
import './index.scss'

class Msg extends Component {
    state = {
        list: []
    };

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    onReachBottom () {

    };

    getList = () => {

    };

    render() {
        const {
            list
        } = this.state;
        const renderList = (msgList) => {
            msgList.map((item) => {
                return (
                    <View className='msg-item' key={Math.random() * Math.random()}>
                        <View className='msg-item_name'>
                            {
                                item.nickName
                            }
                        </View>
                        <View className='msg-item_msg'>
                            {
                                item.userAvatar
                            }
                        </View>
                        <View className='msg-item_avatar'>
                            {
                                item.userMsg
                            }
                        </View>
                        <View className='msg-item_time'>
                            {
                                item.createTime
                            }
                        </View>
                    </View>
                )
            });
        };
        return (
            <View className='page msg'>
                <View className='msg-list'>
                    {
                        renderList(list)
                    }
                </View>
            </View>
        )
    }
}

export default Msg

