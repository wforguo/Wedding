import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, Text, Image, View, Map } from '@tarojs/components'
import './index.scss'
import callHe from '../../common/img/icon-call-he.png';
import callShe from '../../common/img/icon-call-she.png';
import cloud from "../../service/cloud";

class Location extends Component {
    state = {
        navBarTop: 44 + 36 + 6 + 45,
        brideMobile: "18866666666",
        groomMobile: "17666666666",
        location: {
            "address": "兴平路街道晶虹嘉园5号楼",
            "adjCode": [
                "620000",
                "620400",
                "620403"
            ],
            "city": "白银市",
            "district": "平川区",
            "province": "甘肃省",
            "fullAddress": "甘肃省白银市平川区兴平路街道晶虹嘉园5号楼",
            "areaId": "620403",
            "provinceId": "620000",
            "cityId": "620400",
            "longitude": 104.813263,
            "latitude": 36.731502
        }
    };
    componentDidMount() {
        this.getSystemInfo();
    }

    getSystemInfo = () => {
        let systemInfo = Taro.systemInfo;
        let menuButtonInfo = Taro.menuButtonInfo;
        this.setState({
            navBarTop: (systemInfo.statusBarHeight || 44) + (menuButtonInfo.height || 32) + 6 + 20
        });
    };

    getInfo = () => {
        Taro.showNavigationBarLoading();
        cloud.get(
            'wedd_video'
        ).then((res) => {
            if (res.errMsg === 'collection.get:ok') {
                if (res.data.length <= 0) {
                    this.setState({
                        loadingStatus: 'noMore'
                    });
                } else {
                    let info = res.data[0];
                    const {
                        src,
                        poster,
                        danmuList
                    } = info;
                    this.setState({
                        loadingStatus: 'isMore',
                        video: {
                            src,
                            poster,
                            danmuList
                        },
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

    handleMapNav = () => {
        const {
            location,
        } = this.state;
        const {
            latitude,
            longitude,
            fullAddress: address,
        } = location;
        Taro.openLocation({
            latitude,
            longitude,
            address,
            scale: 13,
            fail: (e) => {
                Taro.showToast({
                    title: e.errMsg || '导航打开失败，请检查经纬度',
                    icon: 'none',
                    duration: 3000
                })
            }
        })
    };

    handlePhoneCall = (phone) => {
        Taro.makePhoneCall({
            phoneNumber: phone
        })
    };

    render() {
        const {
            location,
            navBarTop,
            brideMobile,
            groomMobile
        } = this.state;
        const {
            latitude,
            longitude,
            address,
        } = location;
        return (
            <View className='page location'>
                <Map id='map'
                  className='location-map'
                  longitude={longitude}
                  latitude={latitude}
                  scale='14'
                  setting={{}}
                  markers={[{
                         id: 0,
                         longitude: longitude,
                         latitude: latitude,
                         callout: {
                             content: address,
                             color: '#fff',
                             bgColor: '#ff4c91',
                             fontSize: 14,
                             textAlign: 'center',
                             padding: 6,
                             borderRadius: 6,
                             display: 'ALWAYS',
                         },
                         width: 28,
                         height: 28,
                         iconPath: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/icon-nav.png'
                     }]}
                  show-location
                  style='width: 100%; height: 100%;'
                />
                <Button className='location__nav-btn' style={{
                    top: `${navBarTop}px`
                }} onClick={this.handleMapNav.bind(this)}
                >一键导航</Button>
                <View className='location__tool'>
                    <View className='location__tool-btn'>
                        <View className='location__tool-call' onClick={this.handlePhoneCall.bind(this, brideMobile)}>
                            <Image src={callHe} className='location__tool-call-img' />
                            <Text className='location__tool-call-txt'>呼叫新郎</Text>
                        </View>
                        <View className='location__tool-call' onClick={this.handlePhoneCall.bind(this, groomMobile)}>
                            <Image src={callShe} className='location__tool-call-img' />
                            <Text className='location__tool-call-txt'>呼叫新娘</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Location

