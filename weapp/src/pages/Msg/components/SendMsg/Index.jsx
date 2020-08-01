import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Image, Textarea, View } from '@tarojs/components';
import {connect} from "react-redux";
import iconBack from "../../../../common/img/icon-msg-back.png";
import iconSend from "../../../../common/img/icon-msg-send.png";
import './index.scss'
import cloud from '../../../../service/cloud';

@connect(({account}) => ({
    userInfo: account.userInfo
}))

class SendMsg extends Component {
    state = {
        msg: ''
    };

    componentWillMount() {}

    handleMaskClose = () => {
        this.props.onHandleCloseMsg();
    };

    handleInput = (state, e) => {
        this.setState({
            [state]: e.detail.value
        })
    };

    handleSendMsg = () => {
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
            const {
                userInfo
            } = this.props;
            const {
                avatarUrl,
                nickName
            } = userInfo;
            cloud.add('wedd_msgs', {
                userMsg: msg,
                avatarUrl,
                nickName
            }).then(res => {
                console.log(res);
                Taro.hideLoading();
                Taro.showToast({
                    title: '留言成功~',
                });
                this.setState({
                    msg: ''
                })
            });
        }
    };

    // 阻止事件冒泡
    handleTouchMove = (e) => {
        e.stopPropagation();
    };

    render() {
        const {
            visible,
        } = this.props;
        const {
            msg
        } = this.state;
        return (
            <View>
                {
                    visible &&
                    <View className='send-msg' onTouchMove={this.handleTouchMove.bind(this)}>
                        <View className='send-msg-mask'
                          onClick={this.handleMaskClose.bind(this)}
                        />
                        <View className='send-msg-inner'>
                            <View className='send-msg-inner__tool-bar'>
                                <View className='send-msg-inner__tool-btn' onClick={this.handleMaskClose.bind(this)}>
                                    <Image src={iconBack} className='send-msg-inner__back-icon' />
                                </View>
                                <View className='send-msg-inner__tool-btn' onClick={this.handleSendMsg.bind(this)}>
                                    <Image src={iconSend} className='send-msg-inner__send-icon' />
                                </View>
                            </View>
                            <View className='send-msg-inner__input'>
                                <Textarea
                                  value={msg}
                                  show-confirm-bar
                                  confirm-type='发送'
                                  onConfirm={this.handleSendMsg.bind(this)}
                                  onInput={this.handleInput.bind(this, 'msg')}
                                  placeholder='请留下您的祝福，将同步到弹幕留言~'
                                  className='send-msg-inner__area'
                                  placeholderClass='placeholder-style'
                                  maxlength={200}
                                />
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}

export default SendMsg

