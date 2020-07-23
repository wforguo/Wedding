/**
 * @Description: 工具类
 * @author: forguo
 * @date: 2020/7/17
 */

/***
 * @description 去除对象空元素
 * @param data
 */
export const clearEmpty = function (data) {
    let params = {
        ...data
    };
    for (let key in params) {
        if (params[key] === '' || params[key] == null) {
            delete params.key;
        }
    }
    return params;
};

/**
 * @description 求数组最大值
 * @param arr
 * */
export const getMaxNum = function (arr) {
    const length = arr.length;
    let max = arr[0]; // 默认第一个最大
    for (let i = 0; i < length; i++) {
        max = Math.max(max, arr[i]);
    }
    return Math.ceil(max);
};
