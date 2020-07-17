import React, {useEffect, useState} from 'react';
import {Form, Modal} from 'antd';
import styles from './styles.less';

const ChoseLocation = props => {
    const [formVals, setFormVals] = useState(props.values);
    useEffect(() => {
        console.log('did');
        const map = new window.AMap.Map('choseLocation');
        console.log(document.getElementById('choseLocation'));
        console.log(map);
    }, []);
    const [form] = Form.useForm();
    const {
        onSubmit: handleUpdate,
        onCancel: handleModalVisible,
        modalVisible,
    } = props;

    const handleSubmit = async () => {
        const fieldsValue = await form.validateFields();
        setFormVals({...formVals, ...fieldsValue});
        handleUpdate({...formVals, ...fieldsValue});
    };

    const renderContent = () => {
        return (
            <>
                <div id='choseLocation' className={styles.choseLocation}>

                </div>
            </>
        );
    };

    return (
        <div className='location-modal'>
            <Modal
                width={640}
                bodyStyle={{
                    padding: '32px 40px 48px',
                }}
                title="选择地址"
                visible={modalVisible}
                onOk={handleSubmit}
                onCancel={() => handleModalVisible()}
                okText='提交'
            >
                <div>
                    {renderContent()}
                </div>

            </Modal>
        </div>
    );
};

export default ChoseLocation;
