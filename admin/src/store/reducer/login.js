const userInfo = {

};

export default (state = userInfo, action) => {
    const { type } = action;
    switch (type) {
        case 'USER_INFO': {
            const newState = state;
            newState.userInfo = action.userInfo;
            return newState;
        }
        case 'USER': {
            const newState = state;
            newState.userInfo = action.userInfo;
            return newState;
        }
        default: return state;
    }
}
