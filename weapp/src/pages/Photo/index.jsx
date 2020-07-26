import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import { Swiper, SwiperItem, Image, View } from '@tarojs/components'
import './index.scss'

class Photo extends Component {
    state = {
        list: [
            {
                desc: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/assets/imgs/5656.jpg_wh1200.jpg',
                url: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/assets/imgs/girl1.jpg'
            },
            {
                desc: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/assets/imgs/5a28b5d8450fe.jpg',
                url: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/assets/imgs/girl2.jpg'
            },
            {
                desc: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/assets/imgs/5656.jpg_wh1200.jpg',
                url: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/assets/imgs/girl3.jpeg'
            },
            {
                desc: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/assets/imgs/5a28b5d8450fe.jpg',
                url: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/assets/imgs/girl7.jpg'
            },

        ]
    };
    render() {
        const {
            list
        } = this.state;
        const renderList = (photoList) => {
            return photoList.map((item) => {
                return (
                    <SwiperItem key={Math.random() * Math.random()}>
                        <View className='photo-swiper-item'>
                            <Image mode='scaleToFill' className='photo-swiper-photo' src={item.url} lazyLoad />
                        </View>
                    </SwiperItem>
                )
            });
        };
        return (
            <View className='page photo'>
                <Swiper
                  className='photo-swiper'
                  indicatorColor='#999'
                  indicatorActiveColor='#ff4c91'
                  vertical
                  circular
                  indicatorDots
                  autoplay
                >
                    {
                        renderList(list)
                    }
                </Swiper>
            </View>
        )
    }
}

export default Photo

