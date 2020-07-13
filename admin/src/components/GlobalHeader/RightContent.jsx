import {Tag} from 'antd';
import React from 'react';
import {connect} from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

const ENVTagColor = {
    dev: 'orange',
    test: 'green',
    pre: '#87d068',
};

const GlobalHeaderRight = props => {
    const {theme, layout} = props;
    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
        className = `${styles.right}  ${styles.dark}`;
    }
    const now = new Date();
    const time = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
    return (
        <div className={className}>
            <div style={{
                'marginRight': '10px'
            }}>{time}</div>
            <Avatar menu />
            {REACT_APP_ENV && (
                <span>
                    <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
                </span>
            )}
        </div>
    );
};

export default connect(({settings}) => ({
    theme: settings.navTheme,
    layout: settings.layout,
}))(GlobalHeaderRight);
