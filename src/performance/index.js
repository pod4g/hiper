const puppeteer = require('puppeteer')

module.exports = class Performance {
  constructor (opts) {
    this.opts = opts
  }

  async run (opts = this.opts) {
    let startTimestamp = Date.now()
    let {
      executablePath,
      url,
      count,
      headless,
      useragent,
      viewport,
      cookies,
      cache,
      javascript,
      online
    } = opts

    let launchOpts = {
      headless
      // args: ['--unlimited-storage', '--full-memory-crash-report']
    }

    if (executablePath) {
      launchOpts.executablePath = executablePath
    }

    const browser = await puppeteer.launch(launchOpts)
    let tab = await browser.newPage()
    let loadTasks = []
    let loadEvents = []
    let settingTasks = [
      tab.setCacheEnabled(cache),
      tab.setJavaScriptEnabled(javascript),
      tab.setOfflineMode(!online),
      tab.setRequestInterception(false)
    ]
    if (cookies) {
      settingTasks.push(tab.setCookie(...cookies))
    }
    if (viewport) {
      settingTasks.push(tab.setViewport(viewport))
    }
    if (useragent) {
      settingTasks.push(tab.setUserAgent(useragent))
    }
    await Promise.all(settingTasks)
    for (let i = 0; i < count; i++) {
      loadTasks.push(
        tab.goto(url, { timeout: 172800000, waitUntil: 'load' })
      )
      let loadHandler = () => {
        loadEvents.push(tab.evaluate(() => {
          let total = window.performance
          let entries = total.getEntries()
          return JSON.stringify({ total, entries })
        }))
        tab.removeListener('load', loadHandler)
      }
      tab.on('load', loadHandler)
    }
    await Promise.all(loadTasks)
    let performances = await Promise.all(loadEvents)
    setTimeout(() => browser.close())
    global.__hiper__.runInterval = Date.now() - startTimestamp
    // console.log(`跑完 ${global.__hiper__.url} 全部性能测试用时：${(Date.now() - startTimestamp) / 1000}s`)
    // console.log(`\n---------------------- 🚀 各项指标平均耗时（${global.__hiper__.count}次）----------------------\n`)
    return performances
  }
}
