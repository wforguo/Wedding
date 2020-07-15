import {Avatar, Button, message, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryMsg, removeMsg } from './service';
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
        await removeMsg({
            _id: selectedRows._id
        });
        hide();
        message.success('删除成功');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const MsgList = () => {
    const [sorter, setSorter] = useState('');
    const [previewImage, serPreviewImage] = useState('');
    const [previewTitle, serPreviewTitle] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);

    const actionRef = useRef();
    const columns = [
        {
            required: true,
            title: '昵称',
            dataIndex: 'nickName',
            valueType: 'input',
            maxLength: 16,
            hideInForm: false,
            align: 'center',
        },
        {
            required: true,
            title: '头像',
            dataIndex: 'avatarUrl',
            maxLength: 11,
            hideInSearch: true,
            hideInForm: true,
            align: 'center',
            render: (_, record) => (
                <Avatar size="small" src={record.avatarUrl} onClick={() => {
                    serPreviewImage(record.avatarUrl);
                    serPreviewTitle(record.nickName);
                    setPreviewVisible(true);
                }}
                />
            )
        },
        {
            required: true,
            title: '留言',
            dataIndex: 'userMsg',
            valueType: 'input',
            maxLength: 16,
            hideInForm: false,
            align: 'center'
        },
        {
            title: '留言时间',
            dataIndex: 'createTime',
            hideInSearch: true,
            hideInForm: true,
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            align: 'center',
            render: (_, record) => (
                <>
                    <Button type='link' danger onClick={async () => {
                        const success = await handleRemove(record);
                        if (success) {
                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    >删除</Button>
                </>
            ),
        },
    ];
    return (
        <PageHeaderWrapper>
            <ProTable
                headerTitle="留言列表"
                actionRef={actionRef}
                rowKey="_id"
                options={{ density: false}}
                onChange={(_, _filter, _sorter) => {
                    const sorterResult = _sorter;

                    if (sorterResult.field) {
                        setSorter(`${sorterResult.field}_${sorterResult.order}`);
                    }
                }}
                params={{
                    sorter,
                }}
                search={{
                    collapsed: false
                }}
                request={params => queryMsg(params)}
                columns={columns}
            />

            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </PageHeaderWrapper>
    );
};

export default MsgList;
