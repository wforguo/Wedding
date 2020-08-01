import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Image, Textarea, View } from '@tarojs/components';
import iconBack from "../../../../common/img/icon-msg-back.png";
import iconSend from "../../../../common/img/icon-msg-send.png";
import './index.scss'

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
            setTimeout(() => {
                Taro.hideLoading();
                Taro.showToast({
                    title: '留言成功~',
                });
                this.setState({
                    msg: ''
                })
            }, 800);
        }
    };

    render() {
        const {
            visible,
            msg
        } = this.props;
        return (
            <View>
                {
                    visible &&
                    <View className='send-msg'>
                        <View className='send-msg-mask' onClick={this.handleMaskClose.bind(this)} />
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
                                  focus
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

