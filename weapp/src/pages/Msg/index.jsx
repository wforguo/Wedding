import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Image, View } from '@tarojs/components';
import LoadMore from "../../components/LoadMore";
import SendMsg from "./components/SendMsg"
import iconWrite from "../../common/img/icon-write.png";
import './index.scss'

const msgList = [
    {
        "_id": {
            "$oid": "5f0b2209bbdc7e6afb9c265d"
        },
        "msgId": "0b7f56b65e13107a01163d0f160022e5",
        "_openid": "oisc95Y-tlAQA4XVPWdEI9g7G__s",
        "userMsg": "1111",
        "type": "message",
        "createTime": "2020-01-06 18:48:26",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLNEDgNGI1wgYuxPeDgc9P3vUGObxicfeLSwzkN7x8xDL0LFQ2icxVoicqh567sxVcyicxrl5FH4ibqWicg/132",
        "nickName": "零点的温度"
    },
    {
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
    },
    {
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
    },
    {
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
            "$oid": "5f0b2209bbdc7e6afb9c2662"
        },
        "msgId": "14dc756e5d18d77f03e6800359441381",
        "nickName": "赵选",
        "_openid": "oisc95R7cF1O7qkRFe9ET5-2myNs",
        "userMsg": "嗯",
        "type": "message",
        "createTime": "2019-06-30 23:38:39",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLO7CYPmg0n4wIFPaX3qwZ1wLcWyJU4vSMdNBsjuRtJUrnYueFOr0yTG4QSDhAnKyibxjCUicG2r2hA/132"
    },
    {
        "_id": {
            "$oid": "5f0b2209bbdc7e6afb9c2663"
        },
        "msgId": "18ef9ec35f082d2000006d3254e8b03d",
        "nickName": "倚窗听雨眠",
        "type": "message",
        "userMsg": "新婚快乐",
        "_openid": "oisc95aGpNYqswRQwGnMzdExQtes",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/0w9DAnn4Ydu81Kt3TgMhGfwn9WEWT8oWicib5uJ2A3NfcJouCwkeOmNDB3kicj568WQcu9GRGdSuMrn4N9uFTLWBQ/132",
        "createTime": "2020-07-10 16:56:02"
    },
    {
        "_id": {
            "$oid": "5f0b2209bbdc7e6afb9c2664"
        },
        "msgId": "1b05c8285f07c6910000420e0d3641a4",
        "_openid": "oisc95QjVvqT5utaEvM2WCYgOtvw",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIVwoTaLNRWqgcqR4N6KUtvcFNAQyc5icnGegwjVqjTOgIeXeEkHn8Ua5WemlhfgCdyyg3W2etia9yg/132",
        "createTime": "2020-07-10 09:38:23",
        "nickName": "仕熙",
        "type": "message",
        "userMsg": "搞来了"
    },
    {
        "_id": {
            "$oid": "5f0b2209bbdc7e6afb9c2665"
        },
        "msgId": "25c59b425d47e8f20c326ed93325650c",
        "createTime": "2019-08-05 16:29:41",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/WeaY3JibkyfDsicvcEDVO5libePJa9iae2RbSKxhKXvX4p3AHj9riboa0VGCTTFLkeNqS68OgbMUtxNb2Bd2icRibyJibQ/132",
        "nickName": "雨中",
        "_openid": "oisc95aWAow_NJbrZClH6OwS9CKg",
        "userMsg": "哦哦",
        "type": "message"
    },
    {
        "_id": {
            "$oid": "5f0b2209bbdc7e6afb9c2666"
        },
        "msgId": "38d78ca75ed848ff003e343f69cf1d1d",
        "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLOQdQTpWvy7PSlicOBEGFicUA2cUelEJbMxCs5MEY6Qk7G2rwHkZwRycmRpMnPfHVicfr0j77t8Fojw/132",
        "nickName": "清水无形",
        "_openid": "oisc95Q1Pt9m_EuKK1viBuBYF5O0",
        "userMsg": "你们",
        "type": "message",
        "createTime": "2020-06-04 09:06:05"
    },
];

class Msg extends Component {
    state = {
        list: msgList,
        loadingStatus: 'loading',
        msgVisible: false
    };

    componentWillMount() {
        this.getList();
    }

    onPullDownRefresh () {
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
                    list: [...this.state.list, ...msgList],
                    loadingStatus: 'noMore'
                })
            }, 1500);
        });
    };
    render() {
        const {
            list,
            loadingStatus,
            msgVisible
        } = this.state;
        const renderList = (msg) => {
            return msg.map((item) => {
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
                <View className='msg-send' onClick={() => {
                    this.setState({
                        msgVisible: true
                    })
                }}
                >
                    <Image src={iconWrite} className='msg-send-icon' />
                    <View className='msg-send-btn'>
                        写祝福
                    </View>
                </View>

                <SendMsg visible={msgVisible} onHandleCloseMsg={() => {
                    this.setState({
                        msgVisible: false
                    })
                }}
                />
            </View>
        )
    }
}

export default Msg

