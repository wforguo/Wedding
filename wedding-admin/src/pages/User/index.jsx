import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message} from 'antd';
import React, {useState, useRef} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryUser, updateUser, addUser, removeUser } from './service';

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async fields => {
    message.loading('正在添加...');
    try {
        const res = await addUser({...fields});
        message.destroy();
        if (res.code !== 200) {
            message.warning(res.message || '添加失败，请重试');
        } else {
            message.success('添加成功');
        }
    } catch (error) {
        message.destroy();
        message.error('添加失败请重试！');
    }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
    message.loading('保存中...');
    try {
        await updateUser({
            name: fields.name,
            desc: fields.desc,
            key: fields.key,
        });
        message.destroy();
        message.success('保存成功');
        return true;
    } catch (error) {
        message.destroy();
        message.error('保存失败请重试！');
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
        await removeUser({
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
            title: '用户名',
            dataIndex: 'userName',
            valueType: 'input',
            maxLength: 16,
            hideInForm: false,
            align: 'center',
        },
        {
            title: 'E-mail',
            dataIndex: 'userEmail',
            valueType: 'input',
            maxLength: 16,
            hideInForm: false,
            align: 'center'
        },
        {
            title: '手机',
            dataIndex: 'userMobile',
            maxLength: 11,
            hideInForm: false,
            align: 'center'
        },
        {
            title: '密码',
            dataIndex: 'userPwd',
            valueType: 'password',
            hideInForm: false,
            align: 'center',
            hideInSearch: true,
            hideInTable: true
        },
        {
            title: '状态',
            dataIndex: 'userStatus',
            hideInForm: true,
            hideInSearch: true,
            align: 'center',
            render: (_, record) => (
                <span>
                    {
                        record.userStatus === 1 ? '开启' : '禁用'
                    }
                </span>
            ),
        },
        {
            title: '最后登录时间',
            dataIndex: 'lastLoginTime',
            hideInSearch: true,
            hideInForm: true,
            align: 'center'
        },
        {
            title: '最后登录IP',
            dataIndex: 'lastLoginIp',
            hideInSearch: true,
            hideInForm: true,
            align: 'center'
        },
        {
            title: '创建时间',
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
                    <a
                        onClick={() => {
                            console.log(record);
                        }}
                    >
                        编辑
                    </a>
                    <Divider type="vertical"/>
                    <a onClick={() => {
                           console.log(record);
                       }}
                    >删除</a>
                </>
            ),
        },
    ];
    return (
        <PageHeaderWrapper>
            <ProTable
                headerTitle="用户列表"
                actionRef={actionRef}
                rowKey="userName"
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
                request={params => queryUser(params)}
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
                    rowKey="userName"
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
