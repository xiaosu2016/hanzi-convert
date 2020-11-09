
const hanziReverseDict = require('./HanziDict')
/**
 * 汉字转换，繁体转简体或简体转繁体
 *
 * 如需还有未收录的字库，请打开HanziDict.js 文件添加
 *
 */
class HanziConvert {
  constructor () {
    this.result = {}
    this.resultString = ''
    this.instance = null
  }
  static getInstance () {
    if (!this.instance) {
      this.instance = new HanziConvert()
    }
    return this.instance
  }
  initString (str) {
    this.resultString = String(str)
  }
  init (isSc2tc) {
    if (isSc2tc) {
      this.result = this.invertKeyValues(hanziReverseDict)
    } else {
      this.result = hanziReverseDict
    }
    // console.log(this.result)
  }
  invertKeyValues (obj) {
    let result = {}
    Object.keys(obj).reduce((acc, key) => {
      acc[obj[key]] = key
      return acc
    }, result)
    return result
  }
  // 对外接口
  /**
   * 执行文字转换
   * @function convert
   * @param {String} str 需要转换的字符串
   * @param {Boolean} isSc2tc 是否是简体转繁体
   * @return String 转换后的字符串
   */
  convert (str, isSc2tc) {
    this.init(isSc2tc)
    this.initString(str)
    let result = ''
    let len = this.resultString.length
    for (let index = 0; index < len; index++) {
      let item = this.resultString[index]
      result += this.result[item] ? this.result[item] : item
    }
    return result
  }
}

module.exports = HanziConvert.getInstance()
