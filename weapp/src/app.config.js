export default {
    pages: [
        'pages/Index/index',
        'pages/Photo/index',
        'pages/Bless/index',
        'pages/Video/index',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'Weapp',
        navigationBarTextStyle: 'black'
    },
    tabBar: {
        color: '#ccc',
        selectedColor: '#ff4c91',
        borderStyle: 'white',
        backgroundColor: '#ffffff',
        list: [
            {
                pagePath: 'pages/Index/index',
                text: '邀请函',
                iconPath: 'common/tab/index.png',
                selectedIconPath: 'common/tab/index-active.png'
            },
            {
                pagePath: 'pages/Photo/index',
                text: '相册',
                iconPath: 'common/tab/map.png',
                selectedIconPath: 'common/tab/map-active.png'
            },
            {
                pagePath: 'pages/Bless/index',
                text: '祝福',
                iconPath: 'common/tab/mine.png',
                selectedIconPath: 'common/tab/mine-active.png'
            }
        ]
    }
}
