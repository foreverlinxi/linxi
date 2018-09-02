export default {
  // 按照切割数量，切割数组，切出来的数组每组元素个数一样，最后一组为剩余的。list为需要切割的数组，num为每组的元素个数
  incisionArray: (list, num) => {
    let arr = []
    for (let i = 0; i < Math.ceil(list.length / num); i++) {
      let start = i * num
      let end = start + num
      arr.push(list.slice(start, end))
    }
    return arr
  },
  // 获取url参数
  getQueryString: (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r !== null) {
      return unescape(r[2])
    }
    return null
  }
}
