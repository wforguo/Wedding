import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
    onMenuClick = event => {
        const { key } = event;

        if (key === 'Logout') {
            const { dispatch } = this.props;

            if (dispatch) {
                dispatch({
                    type: 'login/logout',
                });
            }

            return;
        }

        history.push(`/Account/${key}`);
    };

    render() {
        const {
            currentUser = {
                userAvatar: '',
                userName: '',
            },
            menu,
        } = this.props;
        const menuHeaderDropdown = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                {menu && (
                    <Menu.Item key="Profile">
                        <UserOutlined />
                        个人资料
                    </Menu.Item>
                )}
                {menu && (
                    <Menu.Item key="ResetPwd">
                        <SettingOutlined />
                        修改密码
                    </Menu.Item>
                )}
                {menu && <Menu.Divider />}

                <Menu.Item key="Logout">
                    <LogoutOutlined />
                    退出登录
                </Menu.Item>
            </Menu>
        );
        return currentUser && currentUser.userName ? (
            <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.userAvatar} alt="avatar" />
          <span className={styles.name}>{currentUser.userName}</span>
        </span>
            </HeaderDropdown>
        ) : (
            <span className={`${styles.action} ${styles.account}`}>
        <Spin
            size="small"
            style={{
                marginLeft: 8,
                marginRight: 8,
            }}
        />
      </span>
        );
    }
}

export default connect(({ user }) => ({
    currentUser: user.currentUser,
}))(AvatarDropdown);
