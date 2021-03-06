import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, message} from 'antd';
import React, {useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import {addUser, queryUser, removeUser, updateUser} from './service';

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
            return true;
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
        const res = await updateUser({...fields});
        message.destroy();
        if (res.code !== 200) {
            message.warning(res.message || '保存失败，请重试');
        } else {
            message.success('保存成功');
            return true;
        }
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
            _id: selectedRows._id
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

const UserList = () => {
    const [sorter, setSorter] = useState('');
    const [createModalVisible, handleModalVisible] = useState(false);
    const [updateModalVisible, handleUpdateModalVisible] = useState(false);
    const [formValues, setFormValues] = useState({});
    const actionRef = useRef();
    const columns = [
        {
            required: true,
            title: '用户名',
            dataIndex: 'userName',
            valueType: 'input',
            maxLength: 16,
            hideInForm: false,
            align: 'center',
            placeholder: '登录账号'
        },
        {
            required: true,
            title: '密码',
            dataIndex: 'userPwd',
            valueType: 'password',
            hideInForm: false,
            align: 'center',
            hideInSearch: true,
            hideInTable: true,
            placeholder: '登录密码'
        },
        {
            required: true,
            title: 'E-mail',
            dataIndex: 'userEmail',
            valueType: 'input',
            maxLength: 16,
            hideInForm: false,
            align: 'center'
        },
        {
            required: true,
            title: '手机',
            dataIndex: 'userMobile',
            maxLength: 11,
            hideInForm: false,
            align: 'center',
            type: 'tel'
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
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            align: 'center',
            render: (_, record) => (
                <>
                    <Button type='link'
                            onClick={() => {
                                handleUpdateModalVisible(true);
                                console.warn(record);
                                setFormValues(record);
                            }}
                    >编辑
                    </Button>
                    <Divider type="vertical"/>
                    <Button type='link' danger disabled={record.userName === 'admin'} onClick={async () => {
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
                headerTitle="账号列表"
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
                request={params => queryUser(params)}
                columns={columns}
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
                    rowKey="_id"
                    type="form"
                    columns={columns}
                />
            </CreateForm>
            {formValues && Object.keys(formValues).length ? (
                <UpdateForm
                    onSubmit={async value => {
                        const success = await handleUpdate(value);

                        if (success) {
                            handleUpdateModalVisible(false);
                            setFormValues({});

                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
                        }
                    }}
                    onCancel={() => {
                        handleUpdateModalVisible(false);
                        setFormValues({});
                    }}
                    updateModalVisible={updateModalVisible}
                    values={formValues}
                />
            ) : null}
        </PageHeaderWrapper>
    );
};

export default UserList;
