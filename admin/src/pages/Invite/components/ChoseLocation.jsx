import React, {useEffect, useState} from 'react';
import {Form, Button} from 'antd';
import styles from './styles.less';
import {EnvironmentOutlined} from '@ant-design/icons';

const ChoseLocation = props => {
    const [formVals, setFormVals] = useState(props.values);
    useEffect(() => {
        const map = new window.AMap.Map('choseLocation');
    }, []);
    const [form] = Form.useForm();
    const {
        onSubmit: handleUpdate,
    } = props;

    const handleSubmit = async () => {
        const fieldsValue = await form.validateFields();
        setFormVals({...formVals, ...fieldsValue});
        handleUpdate({...formVals, ...fieldsValue});
    };

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
                <Button style={{marginBottom: 15}} type='primary'><EnvironmentOutlined /> 重新定位</Button>
                {renderContent()}
            </div>
        </div>
    );
};

export default ChoseLocation;
