const program = require('commander')
const pjson = require('../../package.json')
const path = require('path')
const fs = require('fs')
const Util = require('../util')

const {
  _args,
  version,
  description
} = pjson

module.exports = class Cli {
  parseJSONFile (filePath) {
    filePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)
    let data = null
    try {
      data = JSON.parse(fs.readFileSync(filePath).toString())
      if (data) {
        let { noCache, noJavascript, noOnline } = data
        data.cache = !noCache
        data.javascript = !noJavascript
        data.online = !noOnline
        delete data.noCache
        delete data.noJavascript
        delete data.noOnline
      }
    } catch (error) {
      console.log(error)
    }
    return data
  }

  headless (b) {
    if (b === 'true') b = true
    if (b === 'false') b = false
    return b
  }

  monitor () {
    let url = null
    program
      .version(version, '-v, --version')
      .usage('[options] [url]')
      .description(description)
      .arguments('<url>')
      .action(u => url = u) // eslint-disable-line
      .option('-n, --count <n>', '指定加载次数（default: 20）', parseInt)
      .option('-c, --config <path>', '载入配置文件（绝对路径）', this.parseJSONFile)
      .option('-u, --useragent <ua>', '设置useragent')
      .option('-H, --headless [b]', '是否使用无头模式（default: true）', this.headless)
      .option('--no-cache', '禁用缓存（default: false）')
      .option('--no-javascript', '禁用javascript（default: false）')
      .option('--no-online', '离线模式（defalut: false）')
      .parse(process.argv)

    let {
      count,
      config,
      headless,
      useragent,
      cache,
      javascript,
      online
    } = program

    if (!config) config = {}

    url = Util.urlNormalize(url || config.url)
    // 给cli参数赋予默认值
    if (!count) {
      count = config.count || _args.count
    }

    if (useragent == null) {
      useragent = config.useragent
    }

    if (headless == null) {
      headless = config.headless || _args.headless
    }

    if (cache == null) {
      cache = config.cache || !_args.noCache
    }

    if (javascript == null) {
      javascript = config.javascript || !_args.noJavascript
    }

    if (online == null) {
      online = config.online || !_args.noOnline
    }

    if (config.viewport) {
      config.viewport.deviceScaleFactor = config.viewport.deviceScaleFactor || 1
      config.viewport.isMobile = config.viewport.isMobile || false
      config.viewport.hasTouch = config.viewport.hasTouch || false
      config.viewport.isLandscape = config.viewport.isLandscape || false
    }

    if (config.cookies && !Array.isArray(config.cookies)) {
      config.cookies = [config.cookies]
    }

    let opts = Object.assign(config, {
      url,
      count,
      headless,
      useragent,
      cache,
      javascript,
      online
    })

    console.log('opts:', opts)

    global.__hiper__ = opts

    return opts
  }
}
