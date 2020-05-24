import request from '@/utils/request';

export async function fakeAccountLogin({ userName, userPwd }) {
    const data = {
        userName,
        userPwd
    };
    return request('/api/user/login', {
        method: 'post',
        data
    })
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
