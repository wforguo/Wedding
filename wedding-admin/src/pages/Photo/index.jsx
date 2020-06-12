import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message, Avatar, Modal} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {queryRule, updateRule, addRule, removeRule} from './service';

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
    const hide = message.loading('正在添加');

    try {
        await addRule({...fields});
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

const handleUpdate = async fields => {
    const hide = message.loading('正在配置');

    try {
        await updateRule({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        hide();
        message.success('配置成功');
        return true;
    } catch (error) {
        hide();
        message.error('配置失败请重试！');
        return false;
    }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
        await removeRule({
            key: selectedRows.map(row => row.key),
        });
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const TableList = () => {
    const [sorter, setSorter] = useState('');
    const [createModalVisible, handleModalVisible] = useState(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState(false);
    const [stepFormValues, setStepFormValues] = useState({});
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
            title: '创建时间',
            dataIndex: 'updatedAt',
            valueType: 'option',
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
                <Avatar size="small" src={record.avatar} onClick={() => {
                    Modal.confirm({
                        width: '750px',
                        centered: true,
                        okText: '关闭',
                        okCancel: false,
                        maskClosable: true,
                        content: <img src={record.avatar} alt={record.avatar} style={
                            {
                                display: "block", margin: '0 auto', width: '100%'}
                        }
                        />
                    })
                }}
                />
            )
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            align: 'center',
            render: (_, record) => (
                <>
                    <a
                        onClick={() => {
                        }}
                    >
                        编辑
                    </a>
                    <Divider type="vertical"/>
                    <a href=""
                       onClick={() => {
                       }}
                    >删除</a>
                </>
            ),
        },
    ];
    return (
        <PageHeaderWrapper>
            <ProTable
                headerTitle="查询表格"
                actionRef={actionRef}
                rowKey="key"
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
                toolBarRender={(action, {selectedRows}) => [
                    <Button type="primary" onClick={() => handleModalVisible(true)}>
                        <PlusOutlined/> 新增
                    </Button>,
                    selectedRows && selectedRows.length > 0 && (
                        <Button type="primary"
                                onClick={async () => {
                                    await handleRemove(selectedRows);
                                    action.reload();
                                }}>
                            <PlusOutlined/> 批量删除
                        </Button>
                    ),
                ]}
                request={params => queryRule(params)}
                columns={columns}
                rowSelection={{}}
            />
            <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
                <ProTable
                    onSubmit={async value => {
                        const success = await handleAdd(value);

                        if (success) {
                            handleModalVisible(false);

                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    rowKey="key"
                    type="form"
                    columns={columns}
                    rowSelection={{}}
                />
            </CreateForm>
            {stepFormValues && Object.keys(stepFormValues).length ? (
                <UpdateForm
                    onSubmit={async value => {
                        const success = await handleUpdate(value);

                        if (success) {
                            handleUpdateModalVisible(false);
                            setStepFormValues({});

                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    onCancel={() => {
                        handleUpdateModalVisible(false);
                        setStepFormValues({});
                    }}
                    updateModalVisible={updateModalVisible}
                    values={stepFormValues}
                />
            ) : null}
        </PageHeaderWrapper>
    );
};

export default TableList;
