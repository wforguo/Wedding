import {UploadOutlined} from '@ant-design/icons';
import {Button, Input, Upload, Form, message} from 'antd';
import {connect,} from 'umi';
import React, {Component} from 'react';
import styles from './BaseView.less';

class BaseView extends Component {
    getViewDom = ref => {
        this.view = ref;
    };

    handleFinish = () => {
        message.success(
            '修改成功'
        );
    };

    render() {
        const {currentUser} = this.props;
        const {userAvatar} =currentUser;
        return (
            <div className={styles.baseView} ref={this.getViewDom}>
                <div className={styles.right}>
                    <div className={styles.avatar}>
                        <img src={userAvatar} alt="avatar"/>
                    </div>
                    <Upload showUploadList={false}>
                        <div className={styles.button_view}>
                            <Button>
                                <UploadOutlined/>
                                更换头像
                            </Button>
                        </div>
                    </Upload>
                </div>
            </div>
        );
    }
}

export default connect(({user}) => ({
    currentUser: user.currentUser,
}))(BaseView);
