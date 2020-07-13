import request from '@/utils/request';

export async function queryPhotoList(params) {
    return request('/api/photo/list', {
        params
    });
}

export async function removePhoto(params) {
    return request('/api/photo/remove', {
        method: 'get',
        params
    });
}

export async function addPhoto(params) {
    return request('/api/photo/add', {
        method: 'POST',
        data: {...params},
    });
}
