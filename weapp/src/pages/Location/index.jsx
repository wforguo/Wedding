import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Button, Text, View, Map } from '@tarojs/components'
import './index.scss'
import iconNav from './icon-nav.png';

class Location extends Component {
    state = {
        latitude: 36.730922,
        longitude: 104.792082,
        address: '甘肃省白银市平川区世纪大道'
    };

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

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

    render() {
        const {
            latitude,
            longitude,
            address
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
                             bgColor: '#297EE3',
                             fontSize: 17,
                             textAlign: 'center',
                             padding: 10,
                             borderRadius: 8,
                             display: 'ALWAYS',
                         },
                         width: 28,
                         height: 32,
                         iconPath: iconNav
                     }]}
                  show-location
                  style='width: 100%; height: 100%;'
                />
                <View className='location-tool'>
                    <View className='location_nav-btn' onClick={this.handleMapNav.bind(this)}>一键导航</View>
                </View>
            </View>
        )
    }
}

export default Location

