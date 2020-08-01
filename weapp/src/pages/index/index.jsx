import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Navigator, Image, Button, View } from '@tarojs/components'
import './index.scss'
import inviteTips from '../../common/img/invite-tips.png';
import inviteLetter from '../../common/img/invite-letter.png';
import iconAbout from '../../common/img/icon-about.png';
import iconShare from '../../common/img/icon-share.png';

import cloud from '../../service/cloud';
import LoadMore from "../../components/LoadMore";

class Index extends Component {
    state = {
        loadingStatus: 'loading',
        navBarTop: 44 + 36 + 6 + 45,
        invite: {
            groomName: '新郎',
            brideName: '新娘',
            startTime: "2020/07/18",
            address: "兴平路街道晶虹嘉园5号楼",
            banner: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/invite/banner.jpg',
        }
    };


    componentWillMount() {
        this.getSystemInfo();
        this.getInviteInfo();
    }
    onShareAppMessage () {
        const {
            invite
        } = this.state;
        return {
            title: `诚邀您参加${invite.groomName}&${invite.brideName}的婚礼`,
        }
    }

    getInviteInfo = () => {
        Taro.showNavigationBarLoading();
        cloud.get('wedd_invite').then((res) => {
            if (res.errMsg === 'collection.get:ok') {
                if (res.data.length <= 0) {
                    this.setState({
                        loadingStatus: 'noMore'
                    });
                } else {
                    let data = res.data[0];
                    const {
                        groomName,
                        brideName,
                        startTime,
                        banner,
                        location
                    } = data;
                    let invite = {
                        groomName,
                        brideName,
                        startTime,
                        banner,
                        address: location.address
                    };
                    this.setState({
                        invite: invite,
                        loadingStatus: 'isMore'
                    });
                }
            }
            Taro.hideNavigationBarLoading();
            Taro.stopPullDownRefresh();
        }, (err) => {
            console.log(err);
            Taro.stopPullDownRefresh();
            Taro.hideNavigationBarLoading();
            this.setState({
                loadingStatus: 'noMore'
            });
            Taro.showToast({
                title: err.errMsg || '请求失败，请重试！',
                icon: 'none',
                duration: 3000
            });
        });
    };

    getSystemInfo = () => {
        let systemInfo = Taro.systemInfo;
        let menuButtonInfo = Taro.menuButtonInfo;
        this.setState({
            navBarTop: (systemInfo.statusBarHeight || 44) + (menuButtonInfo.height || 32) + 6 + 20
        });
    };


    render() {
        const {
            invite,
            navBarTop,
            loadingStatus
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
                <View className='invite-tool' style={{
                    top: `${navBarTop}px`
                }}
                >
                    <Navigator url='/pages/About/index' className='invite-tool-btn invite-tool-about'>
                        <Image src={iconAbout} className='invite-tool-icon invite-tool-about-icon' />
                    </Navigator>
                    <Button openType='share' className='invite-tool-btn invite-tool-share'>
                        <Image src={iconShare} className='invite-tool-icon invite-tool-share-icon' />
                    </Button>
                </View>

                {
                    loadingStatus === 'loading' &&
                    <View className='spin-loading'>
                        <LoadMore noMoreText='暂无数据，请重试！' loadingStatus={loadingStatus} />
                    </View>
                }
            </View>
        )
    }
}

export default Index

