import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Button, Card, DatePicker, Form, Input, message, Collapse } from 'antd';
import {getInvite, updateInvite} from './service';
import ChoseLocation from './components/ChoseLocation';

const { Panel } = Collapse;

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD HH';

const FormSizeDemo = () => {

    // eslint-disable-next-line no-underscore-dangle
    let _id = null;

    useEffect(() => {
        getInviteInfo();
    }, []);

    const [formVals] = useState({});
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        const formData = await form.validateFields();
        const params = {
            ...formData
        };
        params.startTime = moment(params.holdTime[0]).format(dateFormat);
        params.endTime = moment(params.holdTime[1]).format(dateFormat);
        // eslint-disable-next-line no-underscore-dangle
        params._id = _id;
        handleUpdate(params);
    };

    const getInviteInfo = async () => {
        message.loading({
            content: '加载中...',
            duration: 0
        });
        try {
            const res = await getInvite();
            if (res && res.data) {
                const formData = {
                    ...res.data
                };
                // eslint-disable-next-line no-underscore-dangle,prefer-destructuring
                _id = res.data._id;
                formData.holdTime = [moment(formData.startTime, dateFormat), moment(formData.endTime, dateFormat)];
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

    const handleChoseLocation = (data) => {
        console.log(data);
    };

    return (
        <>
            <PageHeaderWrapper>
                <Card bordered={false}>
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
                                style={{width: '100%'}}
                                showTime={{format: 'HH'}}
                                format="YYYY/MM/DD HH"
                            />
                        </Form.Item>

                        <Form.Item label="举办地" name='location0'>
                            <Collapse ghost>
                                <Panel forceRender header="请选择" key="1">
                                    <ChoseLocation
                                        onSubmit={(data) => handleChoseLocation(data)}
                                    />
                                </Panel>
                            </Collapse>
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
                            <Input.TextArea rows={3} maxLength='300' placeholder='请输入致辞'/>
                        </Form.Item>

                        <Form.Item style={{marginTop: 32}} wrapperCol={{
                            xs: {span: 24, offset: 0},
                            sm: {span: 12, offset: 6},
                        }}>
                            <Button style={{width: '100%'}} type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        </>
    );
};
export default FormSizeDemo;
