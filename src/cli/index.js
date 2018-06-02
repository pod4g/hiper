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
         .option('-H, --headless [b]', 'set the broswer has head or not', this.headless, _args.headless)
         .option('-n, --count <n>', 'reload count', parseInt)
         .option('-c, --config <n>', 'load config file', this.parseJSONFile)
         .parse(process.argv)

      let { count, config, headless } = program
      
      if (config && config.cookies && !Array.isArray(config.cookies)) {
         config.cookies = [config.cookies]
      }
      if (!count) {
         count = _args.defaultReloadCount
      }

      let url = loadUrl || (config || {}).url
      
      global.__hiper__ = { count, headless, config, url}

      return global.__hiper__ 
   }
}

module.exports = Cli