module.exports = class Util {
  /**
   * @param {Number} ms
   * 把毫秒数转化为人类可读的字符串
  */
  static formatMSToHumanReadable (ms, readable = true) {
    let ret = `${(ms).toFixed(2)} ms`
    if (!readable) return ret
    const ONE_SECOND = 1000
    const ONE_MINUTE = 60 * ONE_SECOND
    const ONE_HORE = 60 * ONE_MINUTE
    // 小于1秒，那么用毫秒为单位
    if (ms >= ONE_SECOND && ms < ONE_MINUTE) {
      // 大于一秒小于一分钟，用秒作为单位
      ret = `${(ms / 1000).toFixed(2)} s`
    } else if (ms >= ONE_MINUTE && ms < ONE_HORE) {
      // 大于一分钟，小于一小时，用分钟作单位
      ret = `${(ms / 1000 / 60).toFixed(2)} m`
    } else if (ms >= ONE_HORE) {
      // 大于一个小时，用小时作单位
      ret = `${(ms / 1000 / 60 / 60).toFixed(2)} h`
    }
    return ret
  }

  static urlNormalize (url) {
    if (!url) return ''
    if (url.startsWith('//')) {
      return `https:${url}`
    }
    if (!/^https?:\/\//.test(url)) {
      return `https://${url}`
    }
    return url
  }
}
