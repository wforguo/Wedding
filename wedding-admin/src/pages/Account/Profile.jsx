import React, { Component } from 'react';
import { connect } from 'umi';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import BaseView from './components/base';
import styles from './style.less';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { currentUser } = this.props;

        if (!currentUser.userId) {
            return '';
        }

        return (
            <PageHeaderWrapper>
                <GridContent className={styles.main}>
                    <div className={styles.right}>
                        <div className={styles.title}>基本设置</div>
                        <BaseView />
                    </div>
                </GridContent>
            </PageHeaderWrapper>
        );
    }
}

export default connect(
    ({user}) => ({
        currentUser: user.currentUser,
    })
)(Profile);
