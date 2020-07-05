import request from '@/utils/request';

export async function queryUser(params) {
    return request('/api/user/list', {
        method: 'get',
        params,
    });
}

export async function removeUser(params) {
    return request('/api/user/del', {
        method: 'get',
        params
    });
}

export async function addUser(params) {
    return request('/api/user/add', {
        method: 'POST',
        data: {...params},
    });
}

export async function updateUser(params) {
    return request('/api/user/update', {
        method: 'POST',
        data: {...params},
    });
}
