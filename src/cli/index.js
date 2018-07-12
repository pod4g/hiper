const program = require('commander')
const pjson = require('../../package.json')
const path = require('path')
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
      data = require(filePath)
      if (data) {
        let { noBanner, noCache, noJavascript, noOnline } = data
        data.banner = !noBanner
        data.cache = !noCache
        data.javascript = !noJavascript
        data.online = !noOnline
        delete data.noBanner
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
      .option('-n, --count <n>', 'specified loading times (default: 20)', parseInt)
      .option('-c, --config <path>', 'load the configuration file', this.parseJSONFile)
      .option('-u, --useragent <ua>', 'to set the useragent')
      .option('-H, --headless [b]', 'whether to use headless mode (default: true)', this.headless)
      .option('-e, --executablePath <path>', 'use the specified chrome browser')
      .option('--no-banner', 'disable banner (default: false)')
      .option('--no-cache', 'disable cache (default: false)')
      .option('--no-javascript', 'disable javascript (default: false)')
      .option('--no-online', 'disable network (defalut: false)')
      .parse(process.argv)

    let {
      executablePath,
      count,
      config,
      headless,
      useragent,
      banner,
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

    if (banner == null) {
      banner = config.banner || !_args.banner
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

    if (executablePath == null) {
      executablePath = config.executablePath
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
      executablePath,
      url,
      count,
      headless,
      useragent,
      banner,
      cache,
      javascript,
      online
    })

    global.__hiper__ = opts

    return opts
  }
}
