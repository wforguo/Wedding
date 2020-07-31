import React, {useEffect, useState} from 'react';
import {Button, message, Row, Col} from 'antd';
import {EnvironmentOutlined} from '@ant-design/icons';
import styles from './styles.less';

let map = null;
const {AMapUI} = window;
let MapPositionPicker = null;

const ChoseLocation = (props) => {
    const [location, setLocation] = useState({});

    // 经纬度 转为 详细地址, 并存储
    const convertLngLatToAddr = (loc) => {
        const geocoder = new window.AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        /**
         *  getAddress方法用于实现逆向地理编码
         * */
        geocoder.getAddress(loc, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
                const { adcode, city, district, province } = result.regeocode.addressComponent;
                const tempAddress = result.regeocode.formattedAddress;
                let lngLat = {
                    lng: loc[0],
                    lat: loc[1]
                };
                if (result.regeocode.aois.length > 0) {
                    lngLat = result.regeocode.aois[0].location.lng;
                }
                const address = tempAddress.split(district)[1];
                const districtId = adcode || null;
                const provinceId = adcode ? `${adcode.substring(0, 2)  }0000` : null;
                const cityId = adcode ? `${adcode.substring(0, 4)  }00` : null;
                const adjCode = adcode ? [provinceId, cityId, districtId] : [];
                const locationData = {
                    address,
                    adjCode,
                    city,
                    district,
                    province,
                    fullAddress: tempAddress,
                    areaId: districtId,
                    provinceId,
                    cityId,
                    longitude: lngLat.lng,
                    latitude: lngLat.lat
                };
                setLocation(locationData);
                props.getLocationData(locationData);
            }
        });
    };

    // 定位失败
    const onError = (data) => {
        // eslint-disable-next-line no-console
        console.warn(data);
        message.info('定位信息获取失败!', 2.5, () => { }, false);
    };

    // 设置地图可拖拽点, 拖拽定位
    const setPositionPicker = (position) => {
        const positionPicker = new MapPositionPicker({
            mode: 'dragMap',
            map,
            iconStyle: { // 自定义外观
                url: 'https://forguo-1302175274.cos.ap-shanghai.myqcloud.com/wedding/assets/img/map-picker.png',
                ancher: [20, 36],
                size: [40, 40]
            }
        });

        positionPicker.on('success', (positionResult) => {
            const changed_address = positionResult.address;
            const { adcode, district, city, province } = positionResult.regeocode.addressComponent;
            const { lng, lat } = positionResult.position;
            const address = changed_address.split(district)[1];
            const districtId = adcode || null;
            const provinceId = adcode ? `${adcode.substring(0, 2)  }0000` : null;
            const cityId = adcode ? `${adcode.substring(0, 4)  }00` : null;
            const adjCode = adcode ? [provinceId, cityId, districtId] : [];
            const locationData = {
                address,
                adjCode, // 行政编号
                city,
                district,
                province,
                fullAddress: changed_address,
                areaId: districtId,
                provinceId,
                cityId,
                longitude: lng,
                latitude: lat
            };
            setLocation(locationData);
            props.getLocationData(locationData);
        });
        positionPicker.on('fail', data => {
            onError(data);
        });
        // 设置可拖拽点的初始位置为当前定位
        positionPicker.start(position);
    };

    // 定位成功
    const onComplete = (data) => {
        const {position} = data;
        const {lat} = data.position;
        const {lng} = data.position;
        // 设置地图中心点和缩放级别
        const lnglatXY = [lng, lat];
        map.setZoomAndCenter(12, lnglatXY);
        // 转换经纬度 到 详细地址
        convertLngLatToAddr(lnglatXY);
        // 设置地图可拖拽定位
        setPositionPicker(position);
    };

    // 获取定位
    const getLocation = () => {
        map.plugin('AMap.Geolocation', () => {
            const geolocation = new window.AMap.Geolocation({
                timeout: 6000, // 超过10秒后停止定位，默认：无穷大
                enableHighAccuracy: true,
                resizeEnable: true,
                showButton: false,
                showCircle: false
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status, result) {
                if (status === 'complete') {
                    onComplete(result);
                } else {
                    console.log(result);
                    onError(result);
                }
            });
        });
    };

    // 重新获取定位
    const handleResetLocation = () => {
        getLocation();
    };

    useEffect(() => {
        AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
            MapPositionPicker = PositionPicker;
            // 加载地图，调用浏览器定位服务
            map = new window.AMap.Map('choseLocation', {
                resizeEnable: true,
                zoom:12,
            });
            getLocation();
        });
    }, []);

    const renderContent = () => {
        return (
            <>
                <div id='choseLocation' className={styles.choseLocation} />
            </>
        );
    };

    return (
        <div className='location-modal'>
            <div>
                <Row align='middle' style={{marginBottom: 15}}>
                    <Col span={4}>
                        <Button danger onClick={handleResetLocation}><EnvironmentOutlined /> 重新定位</Button>
                    </Col>
                    <Col span={18}>
                        <div style={{height: 32, display: 'flex', alignItems: 'center'}}><span style={{marginRight: 15, display: 'inline-block'}}><b>地址：</b>{location.address}</span> <b>经纬度：</b>{location.lng}, {location.lat}</div>
                    </Col>
                </Row>
                {renderContent()}
            </div>
        </div>
    );
};

export default ChoseLocation;
