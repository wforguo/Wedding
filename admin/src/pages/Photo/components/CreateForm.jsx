import React, {useState} from 'react';
import {Form, Input, Modal, Upload} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const formLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 13,
    },
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const CreateForm = props => {

    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ]);

    const [previewImage, serPreviewImage] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [form] = Form.useForm();
    const {
        onSubmit: handleAdd,
        onCancel: handleModalVisible,
        createModalVisible,
    } = props;
    const handleSubmit = async () => {
        const fieldsValue = await form.validateFields();
        handleAdd({...fieldsValue, ... {
            url: fileList[0].url
        }});
    };

    const handleChange = ( {fileList} ) => {
        console.log({ fileList});
        setFileList(fileList )
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">点击上传</div>
        </div>
    );

    const handlePreview = async file => {
        const fileData = file;
        if (!fileData.url && !fileData.preview) {
            fileData.preview = await getBase64(fileData.originFileObj);
        }
        setPreviewVisible(true);
        serPreviewImage(fileData.url || fileData.preview);
    };

    const UploadPhoto = () => (

        <>
            <FormItem
                name="src"
                label="照片"
                required
            >
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 2 ? null : uploadButton}
                </Upload>
            </FormItem>

            <Modal
                visible={previewVisible}
                title='预览'
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );

    const renderContent = () => {

        return (
            <>
                <FormItem
                    name="desc"
                    label="描述"
                    rules={[
                        {
                            required: true,
                            message: '请输入照片描述！',
                        },
                    ]}
                >
                    <Input maxLength={20} placeholder="请输入照片描述"/>
                </FormItem>
                <UploadPhoto />
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
            title="新增照片"
            visible={createModalVisible}
            onOk={handleSubmit}
            onCancel={() => handleModalVisible()}
            okText='提交'
        >
            <Form
                {...formLayout}
                form={form}
            >
                {renderContent()}
            </Form>

        </Modal>
    );
};

export default CreateForm;
