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

export const getUserInfo = (userName) => {
  return axios.request({
    url: 'manage/user/get_info',
    data: {
      userName: userName
    },
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
