import {
    userLogin,
    getUserInfo
} from '@/api/user'
import {setToken, getToken} from '@/libs/util'

export default {
    state: {
        userName: '',
        userId: '',
        avatarImgPath: '',
        token: getToken(),
        access: '',
        hasGetInfo: false
    },
    mutations: {
        setAvatar(state, avatarPath) {
            state.avatarImgPath = avatarPath
        },
        setUserId(state, id) {
            state.userId = id
        },
        setUserName(state, name) {
            state.userName = name
        },
        setAccess(state, access) {
            state.access = access
        },
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setHasGetInfo(state, status) {
            state.hasGetInfo = status
        }
    },
    actions: {
        // 登录
        handleLogin({state, commit}, {userName, userPwd}) {
            userName = userName.trim()
            userPwd = userPwd.trim()
            return new Promise((resolve, reject) => {
                userLogin({
                    userName: userName,
                    userPwd: userPwd
                }).then(res => {
                    const data = res.result
                    commit('setToken', userName)
                    commit('setAvatar', data.userAvatar)
                    commit('setUserName', data.userName)
                    commit('setUserId', data.userId)
                    commit('setAccess', data.userRole)
                    commit('setHasGetInfo', true)
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                commit('setUserName', '')
                commit('setToken', '')
                commit('setAccess', [])
                resolve()
            })
        },
        // 获取用户相关信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                try {
                    getUserInfo(state.token).then(res => {
                        const data = res.result
                        commit('setAvatar', data.userAvatar)
                        commit('setUserName', data.userName)
                        commit('setUserId', data.userId)
                        commit('setAccess', data.userRole)
                        commit('setHasGetInfo', true)
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}
