import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Button, Textarea, Video, View} from '@tarojs/components'
import './index.scss'
import {getRandomColor} from "../../util";

const danmuList = [
    {
        text: '第 1s 零点的温度',
        color: '#ff0000',
        time: 1
    }, {
        text: '第 3s 恭喜恭喜',
        color: '#ff00ff',
        time: 3
    },
    {
        text: '第 1s 新婚快乐',
        color: '#ff0000',
        time: 6
    }, {
        text: '第 3s 雨中',
        color: '#ff00ff',
        time: 9
    },
    {
        text: '第 1s 清水无形',
        color: '#ff0000',
        time: 11
    }, {
        text: '第 3s 百年好合',
        color: '#ff00ff',
        time: 13
    },
    {
        text: '第 1s 零点的温度',
        color: '#ff0000',
        time: 1
    }, {
        text: '第 3s 恭喜恭喜',
        color: '#ff00ff',
        time: 3
    },
    {
        text: '第 1s 新婚快乐',
        color: '#ff0000',
        time: 6
    }, {
        text: '第 3s 雨中',
        color: '#ff00ff',
        time: 9
    },
    {
        text: '第 1s 清水无形',
        color: '#ff0000',
        time: 11
    }, {
        text: '第 3s 百年好合',
        color: '#ff00ff',
        time: 13
    }
];

let videoContext = null;

class Bless extends Component {
    state = {
        video: {
            src: 'https://666f-forguo-0979a1-1251886253.tcb.qcloud.la/wxapp/wedding/static/girl.mp4?sign=82606071afbc37ec98646dd632b8675c&t=1562941106',
            poster: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/marry.jpg',
            desc: ''
        },
        showShare: false,
        list: danmuList
    };

    componentDidMount() {
        videoContext = Taro.createVideoContext('video')
    }

    componentWillUnmount() {
        videoContext = null;
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    handleInput = (state, e) => {
        this.setState({
            [state]: e.detail.value
        })
    };

    // 送上留言祝福
    handleSendBless = () => {
        const {
            msg
        } = this.state;
        if (!msg) {
            Taro.showToast({
                title: '请输入留言内容!',
                icon: 'none'
            });
        } else {
            Taro.showLoading({
                title: '发送中...',
                mask: true
            });
            setTimeout(() => {
                // 发送弹幕
                videoContext.sendDanmu({
                    text: msg,
                    color: getRandomColor()
                });
                Taro.hideLoading();
                Taro.showToast({
                    title: '留言成功~',
                });
                this.setState({
                    msg: ''
                })
            }, 100);
        }
    };

    // 打开分享
    handleOpenShare = () => {
        this.setState({
            showShare: true
        })
    };

    // 关闭分享
    handleCloseShare = (e) => {
        console.log(e);
        this.setState({
            showShare: false
        })
    };

    handleVideoError = (e) => {
        console.log(e);
        Taro.showToast({
            title: e.detail.errMsg || '播放出错，请重新进入！',
            icon: 'none'
        })
    };

    handleShareClick = (e) => {
        console.log(e);
        Taro.showShareMenu();
    };

    render() {
        const {
            list,
            video,
            msg,
            showShare
        } = this.state;

        return (
            <View className='page bless'>
                <View className='bless-media'>
                    <Video
                      className='bless-media__video'
                      src={video.src}
                      controls
                      autoplay={false}
                      poster={video.poster}
                      initialTime='0'
                      id='video'
                      loop={false}
                      muted={false}
                      danmuList={list}
                      enableDanmu
                      danmuBtn
                      onError={this.handleVideoError.bind(this)}
                    />
                </View>
                {/* 留言板 */}
                <View className='bless-msg'>
                    <Textarea value={msg}
                      onInput={this.handleInput.bind(this, 'msg')}
                      className='bless-msg-input'
                      maxlength={100}
                      placeholder='请输入弹幕留言，将同步到留言列表~'
                      placeholderClass='placeholder-style'
                    />
                </View>

                <View className='bless-tool'>
                    <Button className='bless-tool__send-msg' onClick={this.handleSendBless.bind(this)}>发送留言</Button>
                    <Button className='bless-tool__share' openType='share'>分享喜悦</Button>
                </View>

                <View className='bless-share'>
                    <mp-halfScreenDialog
                      onbuttontap={this.handleShareClick.bind(this)}
                      onClose={this.handleCloseShare.bind(this)}
                      show={showShare}
                      maskClosable
                      title='分享喜悦'
                      desc='分享给好友，将直接发送给好友~'
                      tips='分享朋友圈，将会生产一张海报~'
                      buttons={[
                            {
                                type: 'default',
                                className: 'bless-share-moment',
                                text: '辅助操作',
                                value: 0,
                            },
                            {
                                type: 'default',
                                className: 'bless-share-partner',
                                text: '主操作',
                                value: 1
                            }
                        ]}
                    />
                </View>
            </View>
        )
    }
}

export default Bless

