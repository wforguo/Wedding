import {queryCurrent} from '@/services/user';

const currentUserDefault = JSON.parse(window.localStorage.getItem('currentUser'));
const UserModel = {
    namespace: 'user',
    state: {
        currentUser: currentUserDefault || null,
    },
    effects: {
        * fetchCurrent(_, {call, put, select}) {
            console.clear();
            const currentUser = yield select(state => state.user.currentUser);
            const {
                userId
            } = currentUser;

            if (currentUser || userId) {
                const response = yield call(queryCurrent, {
                    userId
                });
                yield put({
                    type: 'saveCurrentUser',
                    payload: response.data,
                });
            }
        },
    },
    reducers: {
        saveCurrentUser(state, action) {
            window.localStorage.setItem('currentUser', JSON.stringify({
                ...state.currentUser,
                ...action.payload,
            }));
            return {...state, currentUser: action.payload || {}};
        },
    },
};
export default UserModel;
