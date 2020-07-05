// https://umijs.org/config/
import {defineConfig} from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const {REACT_APP_ENV} = process.env;
export default defineConfig({
    hash: true,
    antd: {},
    dva: {
        hmr: true,
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        antd: true,
        baseNavigator: true,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [
        {
            path: '/Login',
            component: '../layouts/UserLayout',
            routes: [
                {
                    name: '登录',
                    path: '/Login',
                    component: './Login',
                },
            ],
        },
        {
            path: '/',
            component: '../layouts/SecurityLayout',
            routes: [
                {
                    path: '/',
                    component: '../layouts/BasicLayout',
                    authority: ['admin', 'user'],
                    routes: [
                        {
                            path: '/',
                            redirect: '/Welcome',
                        },
                        {
                            path: '/Welcome',
                            name: '欢迎',
                            icon: 'smile',
                            component: './Welcome',
                        },
                        {
                            name: '甜蜜相册',
                            icon: 'PictureOutlined',
                            path: '/Photo',
                            component: './Photo',
                        },
                        {
                            name: '视频管理',
                            icon: 'PlaySquareOutlined',
                            path: '/Video',
                            redirect: '/Video',
                        },
                        {
                            name: '酒席举办',
                            icon: 'EnvironmentOutlined',
                            path: '/Location',
                            redirect: '/Location',
                        },
                        {
                            name: '留言祝福',
                            icon: 'HeartOutlined',
                            path: '/Bless',
                            component: './Bless',
                        },
                        {
                            name: '好友出席',
                            icon: 'TeamOutlined',
                            path: '/Attend',
                            component: './Attend',
                        },
                        {
                            name: '用户管理',
                            icon: 'UserOutlined',
                            path: '/User',
                            component: './User',
                        },
                        {
                            name: '个人页',
                            icon: 'SettingOutlined',
                            path: '/Account',
                            authority: ['admin'],
                            routes: [
                                {
                                    path: '/Account/Profile',
                                    name: '个人设置',
                                    icon: 'SolutionOutlined',
                                    component: './Account/Profile',
                                    authority: ['admin'],
                                },
                                {
                                    path: '/Account/ResetPwd',
                                    name: '修改密码',
                                    icon: 'SafetyCertificateOutlined',
                                    component: './Account/ResetPwd',
                                    authority: ['admin'],
                                },
                            ],
                        },
                        {
                            component: './404/404',
                        },
                    ],
                },
                {
                    component: './404/404',
                },
            ],
        },
        {
            component: './404/404',
        },
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor,
    },
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
});
