import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Image, Text, View } from '@tarojs/components';
import LoadMore from "../../components/LoadMore";
import './index.scss'

class Msg extends Component {
    state = {
        list: [],
        loadingStatus: 'loading'
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                loadingStatus: 'noMore'
            })
        }, 1500);
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
            list,
            loadingStatus
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
                <View className='msg-item'>
                    <View className='weui-media-box weui-media-box_text'>
                        <View className='weui-media-box_appmsg'>
                            <View className='weui-media-box__hd'>
                                <Image className='weui-media-box__thumb'
                                       src='https://avatar.csdnimg.cn/0/E/9/1_weiguo19951107_1572850039.jpg'
                                />
                            </View>
                            <View className='weui-media-box__bd'>
                                <View className='weui-media-box__title'>标题一</View>
                                <View className='weui-media-box__desc'>由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</View>
                            </View>
                        </View>
                        <View className='weui-media-box__info mes-info'>
                            <View className='weui-media-box__info__meta'>文字来源</View>
                            <View className='weui-media-box__info__meta'>时间</View>
                            <View className='weui-media-box__info__meta weui-media-box__info__meta_extra'>其它信息</View>
                        </View>
                    </View>
                </View>


                <View className='msg-item'>
                    <View className='weui-media-box weui-media-box_text'>
                        <View className='weui-media-box_appmsg'>
                            <View className='weui-media-box__hd'>
                                <Image className='weui-media-box__thumb'
                                       src='https://avatar.csdnimg.cn/0/E/9/1_weiguo19951107_1572850039.jpg'
                                />
                            </View>
                            <View className='weui-media-box__bd'>
                                <View className='weui-media-box__title'>标题一</View>
                                <View className='weui-media-box__desc'>由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</View>
                            </View>
                        </View>
                        <View className='weui-media-box__info mes-info'>
                            <View className='weui-media-box__info__meta'>文字来源</View>
                            <View className='weui-media-box__info__meta'>时间</View>
                            <View className='weui-media-box__info__meta weui-media-box__info__meta_extra'>其它信息</View>
                        </View>
                    </View>
                </View>


                <View className='msg-list'>
                    {
                        renderList(list)
                    }
                </View>
                <LoadMore loadingStatus={loadingStatus} />
            </View>
        )
    }
}

export default Msg

