import React from 'react';
import {GridContent, PageHeaderWrapper} from '@ant-design/pro-layout';
import styles from "@/pages/Account/style.less";
import Pwd from "@/pages/Account/components/Pwd";

export default () => (
    <PageHeaderWrapper>
        <GridContent className={styles.main}>
            <div className={styles.right}>
                <div className={styles.title}>修改密码</div>
                <Pwd/>
            </div>
        </GridContent>
    </PageHeaderWrapper>
);
