import Taro from '@tarojs/taro'
import React, {Component} from 'react'
import {Button, Text, View } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'

import './index.scss'


function buildData (offset = 0) {
    return Array(100).fill(0).map((_, i) => i + offset);
}

const Row = React.memo(({ index, style, data }) => {
    console.log(data);
    return (
        <View className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
            Row {index}
        </View>
    );
});

class Index extends Component {
    state = {
        data: buildData(0),
    };

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {
    }

    // 发送模板消息
    handleSendMessage = () => {
        Taro.requestSubscribeMessage({
            tmplIds: ['MBr6PdwADfv8OIltON6gD7qMiiNQrQhUa4ocMsRe2rE'],
            success(res) {
                console.log(res);
            }
        })
    };

    loading = false;

    listReachBottom() {
        Taro.showLoading();
        // 如果 loading 与视图相关，那它就应该放在 `this.state` 里
        // 我们这里使用的是一个同步的 API 调用 loading，所以不需要
        this.loading = true;
        setTimeout(() => {
            const { data } = this.state;
            this.setState({
                data: data.concat(buildData(data.length))
            }, () => {
                this.loading = false;
                Taro.hideLoading()
            })
        }, 1000)
    };

    render() {
        const { data } = this.state;
        const dataLen = data.length;
        const itemSize = 100;
        return (
            <View className='page index'>
                <View><Text>Hello, World</Text></View>
                <Button className='send-btn' onClick={this.handleSendMessage.bind(this)}>发送模板消息</Button>
                <VirtualList
                  height={500} /* 列表的高度 */
                  width='100%' /* 列表的宽度 */
                  itemData={data} /* 渲染列表的数据 */
                  itemCount={dataLen} /*  渲染列表的长度 */
                  itemSize={100} /* 列表单项的高度  */
                  onScroll={({ scrollDirection, scrollOffset }) => {
                      if (
                          // 避免重复加载数据
                          !this.loading &&
                          // 只有往前滚动我们才触发
                          scrollDirection === 'forward' &&
                          // 5 = (列表高度 / 单项列表高度)
                          // 100 = 滚动提前加载量，可根据样式情况调整
                          scrollOffset > ((dataLen - 5) * itemSize + 100)
                      ) {
                          this.listReachBottom()
                      }
                  }}
                >
                    {Row}
                    {/* 列表单项组件，这里只能传入一个组件 */}
                </VirtualList>
            </View>
        )
    }
}

export default Index

