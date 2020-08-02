

/**
 * @Description: 留言
 * @author: forguo
 * @date: 2020/7/22
*/

import Taro from "@tarojs/taro";
import cloud from "../../service/cloud";

// 获取用户信息
export const dispatchSendMsg = (data) => {
    return () => (
        cloud.add('wedd_msgs', data)
    );
};
