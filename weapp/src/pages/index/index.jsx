import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Image, Text, View } from '@tarojs/components'
import './index.scss'
import inviteTips from '../../common/img/invite-tips.png';
import inviteLetter from '../../common/img/invite-letter.png';

class Index extends Component {
    state = {
        invite: {
            theme: '婚礼主题100天',
            groomName: '新郎',
            brideName: '新娘',
            startTime: "2020/07/18",
            address: "兴平路街道晶虹嘉园5号楼",
            banner: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/invite/banner.jpg',
        }
    };

    onShareAppMessage () {
        const {
            invite
        } = this.state;
        return {
            title: `诚邀您参加${invite.groomName}&${invite.brideName}的婚礼`,
            // path: '/page/user?id=123',
            // imageUrl: ''
        }
    }

    render() {
        const {
            invite
        } = this.state;
        return (
            <View className='page invite'>
                <Image className='invite-banner' src={invite.banner} />
                <View className='invite-info'>
                    <Image className='invite-letter' src={inviteLetter} />
                    <View className='invite-couple'>
                        <View className='invite-groom'>Mr.{invite.groomName}</View>
                        <View className='invite-bride'>Miss.{invite.brideName}</View>
                    </View>
                    <View className='invite-date'>{invite.startTime}</View>
                    <View className='invite-address'>{invite.address}</View>
                    <View className='invite-address-tips'>
                        诚/挚/邀/请/您/参/加/我/们/的/婚/礼
                    </View>
                    <Image src={inviteTips} className='invite-tips' />
                </View>
            </View>
        )
    }
}

export default Index

