import {stringify} from 'querystring';
import {history} from 'umi';
import {fakeAccountLogin} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
import { message} from 'antd';

const Model = {
    namespace: 'login',
    state: {
        status: undefined,
    },
    effects: {
        * login({payload}, {call, put}) {
            message.loading({
                content: '登录中...',
                duration: 0
            });
            try {
                const response = yield call(fakeAccountLogin, payload);
                message.destroy();
                // Login successfully
                if (response.code === 200) {
                    const urlParams = new URL(window.location.href);
                    const params = getPageQuery();
                    let {redirect} = params;
                    // 更新当前登录用户角色
                    yield put({
                        type: 'changeLoginStatus',
                        payload: response.data,
                    });
                    console.log('登录成功 ===>', response.data);
                    yield put({
                        type: 'user/saveCurrentUser',
                        payload: response.data,
                    });
                    yield put({
                        type: 'user/saveAccessToken',
                        payload: response.data.token,
                    });
                    message.success('登录成功');
                    if (redirect) {
                        const redirectUrlParams = new URL(redirect);

                        if (redirectUrlParams.origin === urlParams.origin) {
                            redirect = redirect.substr(urlParams.origin.length);

                            if (redirect.match(/^\/.*#/)) {
                                redirect = redirect.substr(redirect.indexOf('#') + 1);
                            }
                        } else {
                            window.location.href = '/';
                            return;
                        }
                    }
                    history.replace(redirect || '/');
                } else {
                    message.warn(response.message);
                }
            } catch (err) {
                console.warn(err);
            }
        },

        logout() {
            const {redirect} = getPageQuery(); // Note: There may be security issues, please note

            if (window.location.pathname !== '/Login' && !redirect) {
                localStorage.clear();
                sessionStorage.clear();
                history.replace({
                    pathname: '/Login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                });
            }
        },
    },
    reducers: {
        changeLoginStatus(state, {payload}) {
            setAuthority(payload.currentAuthority);
            return {...state, status: payload.status, type: payload.type};
        },
    },
};
export default Model;
