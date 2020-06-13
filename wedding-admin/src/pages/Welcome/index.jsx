import {Avatar, Card, Col, List, Skeleton, Row, Statistic} from 'antd';
import React, {Component} from 'react';
import {connect} from 'umi';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import moment from 'moment';
import styles from './style.less';

const PageHeaderContent = ({currentUser}) => {
    const loading = currentUser && Object.keys(currentUser).length;
    const time = new Date().getHours();
    let hello = '';
    if (time >= 6 && time < 11) {
        hello = '早安~';
    }
    if (time >= 11) {
        hello = '午安~';
    }
    if (time >= 14) {
        hello = '下午好~';
    }
    if (time >= 18) {
        hello = '晚上好~';
    }
    if (time >= 20) {
        hello = '夜深了~';
    }
    if (!loading) {
        return (
            <Skeleton
                avatar
                paragraph={{
                    rows: 1,
                }}
                active
            />
        );
    }

    return (
        <div className={styles.pageHeaderContent}>
            <div className={styles.avatar}>
                <Avatar size="large" src={currentUser.userAvatar}/>
            </div>
            <div className={styles.content}>
                <div className={styles.contentTitle}>
                    {hello}，
                    {currentUser.userName}
                    ，祝你开心每一天！
                </div>
            </div>
        </div>
    );
};

const ExtraContent = () => (
    <div className={styles.extraContent}>
        <div className={styles.statItem}>
            <Statistic title="项目数" value={56}/>
        </div>
        <div className={styles.statItem}>
            <Statistic title="团队内排名" value={8} suffix="/ 24"/>
        </div>
        <div className={styles.statItem}>
            <Statistic title="项目访问" value={2223}/>
        </div>
    </div>
);

class Workplace extends Component {
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    renderActivities = item => {
        const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
            if (item[key]) {
                return (
                    <a href={item[key].link} key={item[key].name}>
                        {item[key].name}
                    </a>
                );
            }

            return key;
        });
        return (
            <List.Item key={item.id}>
                <List.Item.Meta
                    avatar={<Avatar src={item.user.avatar}/>}
                    title={
                        <span>
              <a className={styles.username}>{item.user.name}</a>
                            &nbsp;
                            <span className={styles.event}>{events}</span>
            </span>
                    }
                    description={
                        <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
                    }
                />
            </List.Item>
        );
    };

    render() {
        const {
            currentUser,
            activities,
            activitiesLoading,
        } = this.props;
        if (!currentUser || !currentUser.userId) {
            return null;
        }

        return (
            <PageHeaderWrapper
                content={<PageHeaderContent currentUser={currentUser}/>}
                extraContent={<ExtraContent/>}
            >
                <Row gutter={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            bodyStyle={{
                                padding: 0,
                            }}
                            bordered={false}
                            className={styles.activeCard}
                            title="动态"
                            loading={activitiesLoading}
                        >
                            <List
                                loading={activitiesLoading}
                                renderItem={item => this.renderActivities(item)}
                                dataSource={activities}
                                className={styles.activitiesList}
                                size="large"
                            />
                        </Card>
                    </Col>
                </Row>
            </PageHeaderWrapper>
        );
    }
}

export default connect(
    ({user}) => ({
        currentUser: user.currentUser,
    })
)(Workplace);
