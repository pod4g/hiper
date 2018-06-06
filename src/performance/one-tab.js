const puppeteer = require('puppeteer')

class Performance {
   constructor (opts) {
      this.opts = opts
   }
   async run (opts = this.opts) {
      let startTimestamp = Date.now()
      let { count, headless, config = {}, url } = opts
      console.log('run count:', count)
      const browser = await puppeteer.launch({ headless: false , args: ['--unlimited-storage', '--full-memory-crash-report'] })
      let page = await browser.newPage()
      let list = []
      if (config.cookies) await page.setCookie(...config.cookies)
      page.on('load', async () => {
         let performance = JSON.parse(await page.evaluate(() => {
            let total = window.performance
            let entries = total.getEntries()
            return JSON.stringify({ total, entries })
         }))
         list.push(performance)
      })
      // page.setCacheEnabled(enabled)
      for (let j = 0; j < count + 1; j++) {
         await page.goto(url, { timeout: 172800000, waitUntil: 'load' })
      }
      console.log('list.length:', list.length)
      // setTimeout(() => {
      //    browser.close()
      //    process.exit(-1)
      // })
      console.log(`用时：${(Date.now() - startTimestamp)/1000}s`)
      return list
   }
}

module.exports = Performance