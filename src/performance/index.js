const puppeteer = require('puppeteer')

module.exports = class Performance {
  constructor (opts) {
    this.opts = opts
  }
  async generateTabs (browser, count) {
    let tabs = []
    let pagesLength = 1

    // if (count === 2) {
    //    pagesLength = 2
    // }

    // if (count === 3) {
    //    pagesLength = 3
    // }

    // if (count === 4) {
    //    pagesLength = 4
    // }

    if (count === 10) {
      pagesLength = 5
    }

    if (count >= 20) {
      pagesLength = 4
    }

    if (count >= 40) {
      pagesLength = 8
    }

    if (count >= 80) {
      pagesLength = 10
    }

    if (count >= 100) {
      pagesLength = 20
    }

    for (let i = 0; i < pagesLength; i++) {
      tabs.push(await browser.newPage())
    }
    return tabs
  }
  async run (opts = this.opts) {
    let startTimestamp = Date.now()
    let {
      count,
      headless,
      config = {},
      url,
      cache,
      javascript,
      online
    } = opts
    const browser = await puppeteer.launch({ headless, args: ['--unlimited-storage', '--full-memory-crash-report'] })
    let tabs = await this.generateTabs(browser, count)
    let tabsLen = tabs.length
    let countPerTab = Math.floor(count / tabsLen)
    let lastCountOfTheTab = count - (countPerTab * tabsLen)
    let loadTasks = []
    let loadEvents = []
    for (let i = 0; i < tabsLen; i++) {
      let page = tabs[i]
      let loadCountPerTab = countPerTab
      if (i < tabsLen - 1) loadCountPerTab = countPerTab + lastCountOfTheTab
      if (config.cookies) await page.setCookie(...config.cookies)
      page.setCacheEnabled(cache)
      page.setJavaScriptEnabled(javascript)
      page.setOfflineMode(!online)
      for (let j = 0; j < loadCountPerTab; j++) {
        loadTasks.push(
          page.goto(url, { timeout: 172800000, waitUntil: 'load' })
        )
        page.on('load', () => {
          loadEvents.push(page.evaluate(() => {
            let total = window.performance
            let entries = total.getEntries()
            return JSON.stringify({ total, entries })
          }))
        })
      }
    }
    await Promise.all(loadTasks)
    let performances = await Promise.all(loadEvents)
    setTimeout(() => {
      browser.close()
      process.exit(-1)
    })
    console.log(`跑完 ${global.__hiper__.url} 全部性能测试用时：${(Date.now() - startTimestamp) / 1000}s`)
    console.log(`\n---------------------- 🚀 各项指标平均耗时（${global.__hiper__.count}次）----------------------\n`)
    return performances
  }
}
