import request from '@/utils/request';

export async function queryMsg(params) {
    return request('/api/msg/list', {
        method: 'get',
        params,
    });
}

export async function removeMsg(params) {
    return request('/api/msg/remove', {
        method: 'get',
        params
    });
}
