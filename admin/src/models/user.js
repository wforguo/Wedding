import {queryCurrent} from '@/services/user';

const accessToken = window.localStorage.getItem('accessToken'); // 授权后的token
const currentUserDefault = JSON.parse(window.localStorage.getItem('currentUser'));
const UserModel = {
    namespace: 'user',
    state: {
        accessToken: accessToken || null,
        currentUser: currentUserDefault || null,
    },
    effects: {
        * fetchCurrent(_, {call, put, select}) {
            const currentUser = yield select(state => state.user.currentUser);
            if (currentUser && currentUser.userId) {
                const response = yield call(queryCurrent, {
                    userId: currentUser.userId
                });
                yield put({
                    type: 'saveCurrentUser',
                    payload: response.data,
                });
            }
        },
    },
    reducers: {
        saveAccessToken(state, action) {
            window.localStorage.setItem('accessToken', action.payload || '');
            return {...state, accessToken: action.payload || {}};
        },
        saveCurrentUser(state, action) {
            window.localStorage.setItem('currentUser', JSON.stringify({
                ...state.currentUser,
                ...action.payload,  // 参数合并
            }));
            return {...state, currentUser: action.payload || {}};
        },
    },
};
export default UserModel;
