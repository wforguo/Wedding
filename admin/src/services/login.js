import request from '@/utils/request';

export async function fakeAccountLogin({ userName, userPwd }) {
    const data = {
        userName,
        userPwd
    };
    return request('/api/auth/login', {
        method: 'post',
        data
    })
}
