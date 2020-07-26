import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, Text, Image, View, Map } from '@tarojs/components'
import './index.scss'
import callHe from '../../common/img/call-he.png';
import callShe from '../../common/img/call-she.png';

class Location extends Component {
    state = {
        latitude: 36.730922,
        longitude: 104.792082,
        address: '甘肃省白银市平川区世纪大道',
        navBarTop: 44 + 36 + 6 + 45
    };
    componentDidMount() {
        this.getSystemInfo();
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    getSystemInfo = () => {
        let systemInfo = Taro.systemInfo;
        let menuButtonInfo = Taro.menuButtonInfo;
        this.setState({
            navBarTop: (systemInfo.statusBarHeight || 44) + (menuButtonInfo.height || 32) + 6 + 20
        });
    };

    handleMapNav = () => {
        const {
            latitude,
            longitude,
            address
        } = this.state;
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
            latitude,
            longitude,
            address,
            navBarTop
        } = this.state;
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
                }} onClick={this.handleMapNav.bind(this)}>一键导航</Button>
                <View className='location__tool'>
                    <View className='location__tool-btn'>
                        <View className='location__tool-call' onClick={this.handlePhoneCall.bind(this, '17609491107')}>
                            <Image src={callHe} className='location__tool-call-img' />
                            <Text className='location__tool-call-txt'>呼叫新郎</Text>
                        </View>
                        <View className='location__tool-call' onClick={this.handlePhoneCall.bind(this, '17609491107')}>
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

