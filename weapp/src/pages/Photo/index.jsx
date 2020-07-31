import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Swiper, SwiperItem, Image, View, Button} from '@tarojs/components'
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

    handleImgSave = (src) => {
        console.log(src);
        Taro.getImageInfo({
            src,
            success: (res) => {
                Taro.saveImageToPhotosAlbum({
                    filePath: res.path,
                    success: () => {
                        Taro.showToast({
                            title: '保存成功~'
                        })
                    },
                    fail: () => {
                        Taro.showToast({
                            title: '保存失败，请重试~',
                            icon: 'none'
                        })
                    }
                });
            },
            fail: () => {
                Taro.showToast({
                    title: '保存失败，请重试~',
                    icon: 'none'
                })
            }
        });
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
                            <Image mode='scaleToFill' className='photo-swiper-photo' src={item.url} lazyLoad onClick={this.handleImgSave.bind(this, item.url)} />
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
                <View className='photo-save-tips'>长按可保存至相册</View>
            </View>
        )
    }
}

export default Photo

