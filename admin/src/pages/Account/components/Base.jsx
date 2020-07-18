import {UploadOutlined} from '@ant-design/icons';
import {Button, Form, Input, message, Upload} from 'antd';
import {connect} from 'umi';
import React, {Component} from 'react';
import styles from './BaseView.less';
import {updateUser} from '../../User/service';

const AvatarView = ({avatar}) => (
    <>
        <div className={styles.avatar_title}>
            头像
        </div>
        <div className={styles.avatar}>
            <img src={avatar} alt="avatar"/>
        </div>
        <Upload showUploadList={false}>
            <div className={styles.button_view}>
                <Button>
                    <UploadOutlined/>
                    更换头像
                </Button>
            </div>
        </Upload>
    </>
);

class BaseView extends Component {
    state = {
        loading: false
    };

    view = undefined;

    getAvatarURL() {
        const {currentUser} = this.props;

        if (currentUser) {
            if (currentUser.userAvatar) {
                return currentUser.userAvatar;
            }
        }

        return '';
    }

    getViewDom = ref => {
        this.view = ref;
    };

    handleFinish = async (fields) => {
        this.setState({
            loading: true
        });
        message.loading('保存中...');
        try {
            const res = await updateUser({
                ...fields,
                userId: this.props.currentUser.userId
            });
            message.destroy();
            if (res.code !== 200) {
                message.warning(res.message || '保存失败，请重试');
            } else {
                message.success('保存成功');
                const {dispatch} = this.props;
                if (dispatch) {
                    dispatch({
                        type: 'user/fetchCurrent',
                    });
                }
            }
            this.setState({
                loading: false
            });
        } catch (error) {
            message.destroy();
            message.error('添加失败请重试！');
            this.setState({
                loading: false
            });
        }
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
                            name="userName"
                            label='用户名'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名'
                                },
                            ]}
                        >
                            <Input placeholder='用户名不可修改' disabled maxLength={20}/>
                        </Form.Item>
                        <Form.Item
                            name="userEmail"
                            label='邮箱'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱'
                                },
                            ]}
                        >
                            <Input placeholder='请输入邮箱' maxLength={20}/>
                        </Form.Item>
                        <Form.Item
                            name="userDesc"
                            label='个人简介'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入个人简介'
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder='请输入个人简介'
                                rows={3}
                                maxLength={300}
                            />
                        </Form.Item>
                        <Form.Item
                            name="userMobile"
                            label='手机号'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号'
                                },
                            ]}
                        >
                            <Input placeholder='请输入手机号' type='tel' maxLength={11}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" style={{
                                width: '100%'
                            }} type="primary" loading={loading}>
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.right}>
                    <AvatarView avatar={this.getAvatarURL()}/>
                </div>
            </div>
        );
    }
}

export default connect(({user}) => ({
    currentUser: user.currentUser,
}))(BaseView);
