import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Image, Text, Textarea, View } from '@tarojs/components';
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

    handleSendMsg = () => {
        Taro.showToast({
            title: '发送成功~',
        })
    };

    render() {
        const {
            visible
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
                                <Textarea placeholder='请留下您的祝福，将同步到弹幕留言~' focus className='send-msg-inner__area' placeholderClass='placeholder-style' maxlength={200} />
                            </View>
                        </View>
                    </View>

                }
            </View>
        )
    }
}

export default SendMsg

