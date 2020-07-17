import React, {useState} from 'react';
import {Form, Input, Modal} from 'antd';

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 13,
    },
};

const UpdateForm = props => {
    const [formVals, setFormVals] = useState(props.values);
    const [form] = Form.useForm();
    const {
        onSubmit: handleUpdate,
        onCancel: handleUpdateModalVisible,
        updateModalVisible,
    } = props;

    const handleSubmit = async () => {
        const fieldsValue = await form.validateFields();
        setFormVals({...formVals, ...fieldsValue});
        handleUpdate({...formVals, ...fieldsValue});
    };

    const renderContent = () => {

        return (
            <>
                <FormItem
                    name="userName"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名！',
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名"/>
                </FormItem>
                <FormItem
                    name="userEmail"
                    label="邮箱"
                    rules={[
                        {
                            required: true,
                            message: '请输入邮箱！',
                        },
                    ]}
                >
                    <Input placeholder="请输入邮箱"/>
                </FormItem>
                <FormItem
                    name="userMobile"
                    label="手机"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机！',
                        },
                    ]}
                >
                    <Input placeholder="请输入手机"/>
                </FormItem>
            </>
        );
    };

    return (
        <Modal
            width={640}
            bodyStyle={{
                padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="账号编辑"
            visible={updateModalVisible}
            onOk={handleSubmit}
            onCancel={() => handleUpdateModalVisible()}
            okText='提交'
        >
            <Form
                {...formLayout}
                form={form}
                initialValues={formVals}
            >
                {renderContent()}
            </Form>

        </Modal>
    );
};

export default UpdateForm;
