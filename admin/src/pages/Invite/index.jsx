import React, { useState } from 'react';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import {
    Card,
    Form,
    Input,
    DatePicker,
    Button
} from 'antd';

const { RangePicker } = DatePicker;

const FormSizeDemo = () => {
    const onFormLayoutChange = ({size}) => {
        console.log(size);
    };

    return (
        <>
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        initialValues={{
                            demo: 0
                        }}
                        onValuesChange={onFormLayoutChange}
                    >
                        <Form.Item label="主题">
                            <Input maxLength={15} placeholder='请输入'/>
                        </Form.Item>
                        <Form.Item label="时间">
                            <RangePicker
                                showTime={{ format: 'HH' }}
                                format="YYYY-MM-DD HH"
                                // onChange={onChange}
                                // onOk={onOk}
                            />
                        </Form.Item>
                        <Form.Item label="地点">
                            <Input maxLength={15} placeholder='请输入'/>
                        </Form.Item>
                        <Form.Item label="新娘姓名">
                            <Input maxLength={15} placeholder='请输入'/>
                        </Form.Item>
                        <Form.Item label="新娘手机">
                            <Input maxLength={15} placeholder='请输入'/>
                        </Form.Item>
                        <Form.Item label="新郎姓名">
                            <Input maxLength={15} placeholder='请输入'/>
                        </Form.Item>
                        <Form.Item label="新郎手机">
                            <Input maxLength={15} placeholder='请输入'/>
                        </Form.Item>
                        <Form.Item label="致辞">
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8 }}>
                            <Button type="primary" htmlType="submit">
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
