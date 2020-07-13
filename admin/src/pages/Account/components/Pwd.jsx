import {Button, Input, Form, message} from 'antd';
import {connect} from 'umi';
import React, {Component} from 'react';
import styles from './BaseView.less';

class BaseView extends Component {
    state = {
        loading: false
    };

    view = undefined;

    getViewDom = ref => {
        this.view = ref;
    };

    handleFinish = () => {
        this.setState({
            loading: true
        });
        message.loading({
            content: '保存中...',
            duration: 0
        });
        setTimeout(() => {
            message.destroy();
            message.success(
                '保存成功！'
            );
            this.setState({
                loading: false
            });
        }, 900);
    };

    render() {
        const {
            currentUser
        } = this.props;
        const {
            loading
        } = this.state;
        return (
            <div className={styles.baseView} ref={this.getViewDom}>
                <div className={styles.left}>
                    <Form
                        layout="vertical"
                        onFinish={this.handleFinish}
                        initialValues={currentUser}
                        hideRequiredMark
                    >
                        <Form.Item
                            name="pwdOld"
                            label='旧密码'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入旧密码'
                                },
                            ]}
                        >
                            <Input placeholder='请输入旧密码' type='password' maxLength={20}/>
                        </Form.Item>
                        <Form.Item
                            name="pwdNew"
                            label='新密码'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新密码'
                                },
                            ]}
                        >
                            <Input placeholder='请输入新密码' type='password' maxLength={20}/>
                        </Form.Item>
                        <Form.Item>
                            <Button size='large' htmlType="submit" style={{
                                width: '100%'
                            }} type="primary" loading={loading}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect(({user}) => ({
    currentUser: user.currentUser,
}))(BaseView);
