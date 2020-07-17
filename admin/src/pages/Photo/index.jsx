import {PlusOutlined} from '@ant-design/icons';
import {Avatar, Button, message, Modal} from 'antd';
import React, {useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import {addPhoto, queryPhotoList, removePhoto} from './service';

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
    const hide = message.loading('正在添加');
    try {
        await addPhoto({...fields});
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};
/**
 * 更新节点
 * @param fields
 */

/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
    message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await removePhoto({
            _id: selectedRows._id,
        });
        message.destroy();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        message.destroy();
        message.error('删除失败，请重试');
        return false;
    }
};

const TableList = () => {
    const [sorter, setSorter] = useState('');
    const [createModalVisible, handleModalVisible] = useState(false);

    const [previewImage, serPreviewImage] = useState('');
    const [previewTitle, serPreviewTitle] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);

    const actionRef = useRef();
    const columns = [
        {
            title: '描述',
            dataIndex: 'desc',
            valueType: 'textarea',
            hideInForm: false,
            align: 'center'
        },
        {
            title: '预览',
            dataIndex: 'href',
            valueType: 'option',
            hideInForm: false,
            align: 'center',
            render: (_, record) => (
                <Avatar size="small" src={record.url} onClick={() => {
                    serPreviewImage(record.url);
                    serPreviewTitle(record.desc);
                    setPreviewVisible(true);
                }}
                />
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'option',
            hideInForm: false,
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
                headerTitle="相册列表"
                actionRef={actionRef}
                rowKey="_id"
                options={{density: false}}
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
                toolBarRender={() => [
                    <Button type="primary" onClick={() => handleModalVisible(true)}>
                        <PlusOutlined/> 新增
                    </Button>,
                ]}
                request={params => queryPhotoList(params)}
                columns={columns}
            />
            <CreateForm
                onSubmit={async value => {
                    const success = await handleAdd(value);

                    if (success) {
                        handleModalVisible(false);

                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => handleModalVisible(false)}
                createModalVisible={createModalVisible}
            />

            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
            >
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </PageHeaderWrapper>
    );
};

export default TableList;
