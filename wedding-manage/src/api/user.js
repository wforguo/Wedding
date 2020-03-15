import axios from '@/libs/api.request'

export const userLogin = ({ userName, userPwd }) => {
  const data = {
    userName,
    userPwd
  }
  return axios.request({
    url: 'manage/user/login',
    method: 'post',
    data: data
  })
}

export const getUserInfo = (data) => {
  return axios.request({
    url: 'manage/user/info',
    data,
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUser = (p) => {
    return axios.request({
        url: 'manage/user/list',
        method: 'get',
        params: p
    })
}

export const delUser = (p) => {
    return axios.request({
        url: 'manage/user/del',
        method: 'post',
        data: p
    })
}

export const addUser = (p) => {
    return axios.request({
        url: 'manage/user/add',
        method: 'post',
        data: p
    })
}
