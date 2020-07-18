import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Button, Card, DatePicker, Form, Input, message, Tabs, Spin } from 'antd';
import {getInvite, updateInvite} from './service';
import ChoseLocation from './components/ChoseLocation';

const { TabPane } = Tabs;

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD HH';
// eslint-disable-next-line no-underscore-dangle
let _id = null;

const FormSizeDemo = () => {

    const [form] = Form.useForm();
    const [location, setLocation] = useState({});
    const [formVals] = useState({});
    const [loading, setLoading] = useState(true);

    const getInviteInfo = async () => {
        message.loading({
            content: '加载中...',
            duration: 0
        });
        try {
            const res = await getInvite();
            setLoading(false);
            if (res && res.data) {
                const formData = {
                    ...res.data
                };
                delete formData.location;
                // eslint-disable-next-line no-underscore-dangle,prefer-destructuring
                _id = res.data._id;
                formData.fullAddress = res.data.location.fullAddress;
                formData.holdTime = [moment(formData.startTime, dateFormat), moment(formData.endTime, dateFormat)];
                form.setFieldsValue(formData);
            }
            message.destroy();
            return true;
        } catch (error) {
            setLoading(false);
            message.destroy();
            message.error('获取失败请重试！');
            return false;
        }
    };

    const handleUpdate = async fields => {
        message.loading({
            content: '保存中...',
            duration: 0
        });
        setLoading(true);
        try {
            await updateInvite(fields);
            setLoading(false);
            message.destroy();
            message.success('保存成功');
            return true;
        } catch (error) {
            setLoading(false);
            message.destroy();
            message.error('保存失败请重试！');
            return false;
        }
    };

    const handleLocationData = (data) => {
        setLocation(data);
    };

    const handleSubmit = async () => {
        const formData = await form.validateFields();
        const params = {
            ...formData
        };
        params.location = location; // 位置信息
        params.startTime = moment(params.holdTime[0]).format(dateFormat);
        params.endTime = moment(params.holdTime[1]).format(dateFormat);
        // eslint-disable-next-line no-underscore-dangle
        params._id = _id;
        await handleUpdate(params);
    };

    useEffect(() => {
        getInviteInfo();
    }, []);

    return (
        <>
            <PageHeaderWrapper>
                <Card bordered={false}>

                    <Spin spinning={loading}>

                        <Tabs defaultActiveKey="2" centered>
                            <TabPane tab="婚礼信息" key="0">
                                <Form
                                    style={{marginTop: 8}}
                                    form={form}
                                    labelCol={{
                                        xs: {span: 24},
                                        sm: {span: 6},
                                    }}
                                    wrapperCol={{
                                        xs: {span: 24},
                                        sm: {span: 12},
                                        md: {span: 12},
                                    }}
                                    layout="horizontal"
                                    initialValues={formVals}
                                >
                                    <Form.Item label="主题" name='theme'
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: '请输入主题！',
                                                   },
                                               ]}>
                                        <Input maxLength={15} placeholder='请输入主题'/>
                                    </Form.Item>
                                    <Form.Item label="时间" name='holdTime'
                                               rules={[{
                                                   required: true,
                                                   message: '请选择时间！',
                                               }
                                               ]}>
                                        <RangePicker
                                            style={{width: '100%'}}
                                            showTime={{format: 'HH'}}
                                            format="YYYY/MM/DD HH"
                                        />
                                    </Form.Item>
                                    <Form.Item label="举办地" name='fullAddress'>
                                        <Input disabled placeholder='请选择举办地' />
                                    </Form.Item>
                                    <Form.Item label="新娘姓名" name='brideName'>
                                        <Input maxLength={15} placeholder='请输入'/>
                                    </Form.Item>
                                    <Form.Item label="新娘手机" name='brideMobile'>
                                        <Input maxLength={11} placeholder='请输入'/>
                                    </Form.Item>
                                    <Form.Item label="新郎姓名" name='groomName'>
                                        <Input maxLength={15} placeholder='请输入'/>
                                    </Form.Item>
                                    <Form.Item label="新郎手机" name='groomMobile'>
                                        <Input maxLength={11} placeholder='请输入'/>
                                    </Form.Item>
                                    <Form.Item label="致辞" name='speech'>
                                        <Input.TextArea rows={3} maxLength='300' placeholder='请输入致辞'/>
                                    </Form.Item>
                                </Form>
                            </TabPane>

                            <TabPane tab="举办地" key="2">
                                <ChoseLocation getLocationData={handleLocationData} />
                            </TabPane>

                        </Tabs>

                        <Form.Item style={{marginTop: 32}} wrapperCol={{
                            xs: {span: 24, offset: 0},
                            sm: {span: 12, offset: 6},
                        }}>
                            <Button style={{width: '100%'}} type="primary" onClick={handleSubmit}>
                                保存
                            </Button>
                        </Form.Item>

                    </Spin>
                </Card>
            </PageHeaderWrapper>
        </>
    );
};
export default FormSizeDemo;
