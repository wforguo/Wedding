import request from 'umi-request';


export async function updateInvite(params) {
    return request('/api/invite/update', {
        method: 'POST',
        data: {...params},
    });
}

export async function getInvite(params) {
    return request('/api/invite/info', {
        method: 'get',
    });
}
