let getDay = function (start, end) {
    let between = new Date(end) - new Date(start);
    return between / (60 * 60 * 1000 * 24);
};
console.log(getDay('2019/07/08', '2020/06/04'));
