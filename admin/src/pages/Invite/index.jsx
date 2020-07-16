import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import {EnvironmentOutlined} from '@ant-design/icons';
import {
    Card,
    Form,
    Input,
    DatePicker,
    Button,
    message
} from 'antd';
import { getInvite, updateInvite } from './service';
import ChoseLocation from './components/ChoseLocation';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH';

const FormSizeDemo = () => {

    let _id = '';
    
    useEffect(() => {
        getInviteInfo();
        var map = new AMap.Map('choseLocation');
        console.log(document.getElementById('choseLocation'));
    }, []);

    const [formVals, setFormVals] = useState({});
    const [modalVisible, handleModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        const formVals = await form.validateFields();
        let params = {
            ...formVals
        };
        params.startTime = moment(holdTime[0]).format(dateFormat);
        params.endTime =  moment(holdTime[1]).format(dateFormat);
        params._id = _id;
        handleUpdate(params);
    };

    const getInviteInfo = async () => {
        message.loading({
            content: '加载中...',
            duration: 0
        });
        try {
            let res = await getInvite();
            if (res && res.data) {
                let formData = {
                    ...res.data
                };
                _id = res.data._id;
                formData.holdTime = [moment(formData.startTime, dateFormat), moment(formData.endTime, dateFormat)]
                form.setFieldsValue(formData);
            }
            message.destroy();
            return true;
        } catch (error) {
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
        try {
            await updateInvite(fields);
            message.destroy();
            message.success('保存成功');
            return true;
        } catch (error) {
            message.destroy();
            message.error('保存失败请重试！');
            return false;
        }
    };

    const handleChosetLcation = (data) => {
        console.log(data);
    };

    return (
        <>
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div style={{width: 600,height: 450}} id='choseLocation'></div>
                    <Form
                        style={{ marginTop: 8 }}
                        form={form}
                        labelCol={{
                            xs: { span: 24 },
                            sm: { span: 7 },
                          }}
                        wrapperCol={{
                            xs: { span: 24 },
                            sm: { span: 12 },
                            md: { span: 12 },
                        }}
                        layout="horizontal"
                        initialValues={formVals}
                        onFinish={handleSubmit}
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
                                style={{ width: '100%' }}
                                showTime={{ format: 'HH' }}
                                format="YYYY/MM/DD HH"
                            />
                        </Form.Item>

                        <Form.Item label="举办地" name='location0'>
                            <Button onClick={(e) => handleModalVisible(true)}><EnvironmentOutlined />请选择</Button>
                        </Form.Item>
                    
                        <Form.Item label="地点" name='location'>
                            <Input maxLength={15} placeholder='请输入'/>
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
                            <Input.TextArea rows={3} maxLength='300' placeholder='请输入致辞' />
                        </Form.Item>

                        <Form.Item style={{ marginTop: 32 }} wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 12, offset: 7 },
                        }}>
                            <Button style={{width: '100%'}} type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <ChoseLocation
                    modalVisible={modalVisible} 
                    onSubmit={(data) => handleChosetLcation(data)} 
                    onCancel={() => handleModalVisible(false)} />
            </PageHeaderWrapper>
        </>
    );
};
export default FormSizeDemo;
