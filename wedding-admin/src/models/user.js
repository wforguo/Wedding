import {queryCurrent} from '@/services/user';

const UserModel = {
    namespace: 'user',
    state: {
        currentUser: {},
    },
    effects: {
        * fetchCurrent(_, {call, put}) {
            const response = yield call(queryCurrent, {
                userId: localStorage.getItem('userId')
            });
            yield put({
                type: 'saveCurrentUser',
                payload: response.data,
            });
        },
    },
    reducers: {
        saveCurrentUser(state, action) {
            return {...state, currentUser: action.payload || {}};
        },

        changeNotifyCount(
            state = {
                currentUser: {},
            },
            action,
        ) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload.totalCount,
                    unreadCount: action.payload.unreadCount,
                },
            };
        },
    },
};
export default UserModel;
