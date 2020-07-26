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
        this.getList();
    }

    onPullDownRefresh () {
        console.log('onPullDownRefresh');
        this.setState({
           list: [],
        }, () => {
            this.getList();
        });
    };
    onReachBottom () {
        console.log('onReachBottom');
        this.getList();
    };

    getList = () => {
        this.setState({
            loadingStatus: 'loading'
        }, () => {
            setTimeout(() => {
                Taro.stopPullDownRefresh();
                this.setState({
                    list: [...this.state.list, ...[
                        {
                            "_id": {
                                "$oid": "5f0b2209bbdc7e6afb9c265d"
                            },
                            "msgId": "0b7f56b65e13107a01163d0f160022e5",
                            "_openid": "oisc95Y-tlAQA4XVPWdEI9g7G__s",
                            "userMsg": "零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度",
                            "type": "message",
                            "createTime": "2020-01-06 18:48:26",
                            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLNEDgNGI1wgYuxPeDgc9P3vUGObxicfeLSwzkN7x8xDL0LFQ2icxVoicqh567sxVcyicxrl5FH4ibqWicg/132",
                            "nickName": "零点的温度"
                        },{
                            "_id": {
                                "$oid": "5f0b2209bbdc7e6afb9c265f"
                            },
                            "msgId": "13dba11c5d2c226207e91b8126bf9def",
                            "type": "message",
                            "createTime": "2019-07-15 14:51:17",
                            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/joRUycyVp8HE21coHYN0Cz95zToB6Y0Vc0OIz6MPPghpUvPMy8pJU9X0iaAicBWjpM1ibd8A7lx797RmP1sTvnYlQ/132",
                            "nickName": "天空之城",
                            "_openid": "oisc95d7UfNEJopNzH63y3BusgFM",
                            "userMsg": "恭喜恭喜"
                        },{
                            "_id": {
                                "$oid": "5f0b2209bbdc7e6afb9c2660"
                            },
                            "msgId": "14dc756e5d12d10f00fbfa9200c481ec",
                            "nickName": "飞机飞过天空，天空之城",
                            "_openid": "oisc95d7UfNEJopNzH63y3BusgFM",
                            "userMsg": "哈哈",
                            "type": "message",
                            "createTime": "2019-06-26 09:57:37",
                            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/joRUycyVp8HE21coHYN0Cz95zToB6Y0Vc0OIz6MPPghpUvPMy8pJU9X0iaAicBWjpM1ibd8A7lx797RmP1sTvnYlQ/132"
                        },{
                            "_id": {
                                "$oid": "5f0b2209bbdc7e6afb9c2661"
                            },
                            "msgId": "14dc756e5d18d73103e65ef4706174af",
                            "type": "message",
                            "createTime": "2019-06-30 23:37:21",
                            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLO7CYPmg0n4wIFPaX3qwZ1wLcWyJU4vSMdNBsjuRtJUrnYueFOr0yTG4QSDhAnKyibxjCUicG2r2hA/132",
                            "nickName": "赵选",
                            "_openid": "oisc95R7cF1O7qkRFe9ET5-2myNs",
                            "userMsg": "祝福"
                        },
                        {
                            "_id": {
                                "$oid": "5f0b2209bbdc7e6afb9c265d"
                            },
                            "msgId": "0b7f56b65e13107a01163d0f160022e5",
                            "_openid": "oisc95Y-tlAQA4XVPWdEI9g7G__s",
                            "userMsg": "零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度零点的温度",
                            "type": "message",
                            "createTime": "2020-01-06 18:48:26",
                            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLNEDgNGI1wgYuxPeDgc9P3vUGObxicfeLSwzkN7x8xDL0LFQ2icxVoicqh567sxVcyicxrl5FH4ibqWicg/132",
                            "nickName": "零点的温度"
                        },{
                            "_id": {
                                "$oid": "5f0b2209bbdc7e6afb9c265f"
                            },
                            "msgId": "13dba11c5d2c226207e91b8126bf9def",
                            "type": "message",
                            "createTime": "2019-07-15 14:51:17",
                            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/joRUycyVp8HE21coHYN0Cz95zToB6Y0Vc0OIz6MPPghpUvPMy8pJU9X0iaAicBWjpM1ibd8A7lx797RmP1sTvnYlQ/132",
                            "nickName": "天空之城",
                            "_openid": "oisc95d7UfNEJopNzH63y3BusgFM",
                            "userMsg": "恭喜恭喜"
                        },{
                            "_id": {
                                "$oid": "5f0b2209bbdc7e6afb9c2660"
                            },
                            "msgId": "14dc756e5d12d10f00fbfa9200c481ec",
                            "nickName": "飞机飞过天空，天空之城",
                            "_openid": "oisc95d7UfNEJopNzH63y3BusgFM",
                            "userMsg": "哈哈",
                            "type": "message",
                            "createTime": "2019-06-26 09:57:37",
                            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/joRUycyVp8HE21coHYN0Cz95zToB6Y0Vc0OIz6MPPghpUvPMy8pJU9X0iaAicBWjpM1ibd8A7lx797RmP1sTvnYlQ/132"
                        },{
                            "_id": {
                                "$oid": "5f0b2209bbdc7e6afb9c2661"
                            },
                            "msgId": "14dc756e5d18d73103e65ef4706174af",
                            "type": "message",
                            "createTime": "2019-06-30 23:37:21",
                            "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLO7CYPmg0n4wIFPaX3qwZ1wLcWyJU4vSMdNBsjuRtJUrnYueFOr0yTG4QSDhAnKyibxjCUicG2r2hA/132",
                            "nickName": "赵选",
                            "_openid": "oisc95R7cF1O7qkRFe9ET5-2myNs",
                            "userMsg": "祝福"
                        }
                    ]],
                    loadingStatus: 'noMore'
                })
            }, 1500);
        });
    };

    render() {
        const {
            list,
            loadingStatus
        } = this.state;
        const renderList = (msgList) => {
            return msgList.map((item) => {
                return (
                    <View className='msg-item' key={Math.random() * Math.random()}>
                        <View className='msg-item__user-avatar'>
                            <Image className='msg-item__user-avatar-img'
                              lazyLoad src={item.avatarUrl}
                            />
                        </View>
                        <View className='msg-item__desc'>
                            <View className='msg-item__user-info'>
                                <View className='msg-item__user-name'>
                                    {item.nickName}
                                </View>
                                <View className='msg-item__msg-time'>
                                    {item.createTime}
                                </View>
                            </View>
                            <View className='msg-item__msg-text'>{item.userMsg}</View>
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
                <LoadMore loadingStatus={loadingStatus} />
            </View>
        )
    }
}

export default Msg

