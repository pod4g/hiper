const program = require('commander')
const pjson = require('../../package.json')
const path = require('path')
const fs = require('fs')
const { _args, version, description } = pjson

class Cli {

   parseJSONFile (filePath) {
      filePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath)
      let data = null
      try {
       data = JSON.parse(fs.readFileSync(filePath).toString())
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
      let loadUrl = null
      program
         .version(version, '-v, --version')
         .description(description)
         .arguments('<url>')
         .action(url => loadUrl = url)
         .option('-n, --count <n>', '指定加载次数（default: 20）', parseInt)
         .option('-c, --config <n>', '载入配置文件（绝对路径）', this.parseJSONFile)
         .option('-H, --headless [b]', '是否使用无头模式（default: true）', this.headless, _args.headless)
         .option('--no-cache', '禁用缓存（default: false）')
         .option('--no-javascript', '禁用javascript（default: false）')
         .option('--no-online', '离线模式（defalut: false）')
         .parse(process.argv)

      let { count, config, headless, cache, javascript, online } = program
      if (config && config.cookies && !Array.isArray(config.cookies)) {
         config.cookies = [config.cookies]
      }
      if (!count) {
         count = _args.defaultReloadCount
      }

      let url = loadUrl || (config || {}).url
      
      global.__hiper__ = { count, headless, config, url, cache, javascript, online}

      return global.__hiper__ 
   }
}

module.exports = Cli