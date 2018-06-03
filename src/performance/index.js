const puppeteer = require('puppeteer')

module.exports = class Performance {
  constructor (opts) {
    this.opts = opts
  }
  async generateTabs (browser, count) {
    let tabs = []
    let pagesLength = 1

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

    if (count >= 500) {
      pagesLength = 25
    }

    for (let i = 0; i < pagesLength; i++) {
      tabs.push(await browser.newPage())
    }
    return tabs
  }
  async run (opts = this.opts) {
    let startTimestamp = Date.now()
    // { url: 'http://www.didichuxing.com',
    //   count: 100,
    //   headless: true,
    //   useragent: 'asda',
    //   viewport:
    //   { width: 1140,
    //     height: 768,
    //     deviceScaleFactor: 1,
    //     isMobile: false,
    //     hasTouch: false,
    //     isLandscape: false },
    //   cookies:
    //   [ { name: 'token',
    //       value:
    //         '9+cL224Xh6VuRT/MUJOPVDS0BaSYQ770fyPluWILNMmDqzRnqo1Ns8UVArZvzJvIQJJKMTusu52rh66t36OvnWNaPYHCor3NtoDXJ63fJBN2LtI7xzVflueiSqJ9zMVwZZiPUFPoIRsizEiJydsQguTUu6H+Wq/x1mKa4W6WhVhss5k2D2F8Ab1A8f7CmoIvk9ltdQAYUV+Yns9kSwraW6ytY323ea3NqCP+Cd2zNRsHNF6vXHjBpa8q1Fy0NKXsLDxDiGgAAkwmaITWFK4LfyonvxTWY5Q==',
    //       domain: 'i.xiaojukeji.com',
    //       path: '/',
    //       size: 294,
    //       httpOnly: true } ],
    //   cache: true,
    //   javascript: true,
    //   online: true
    // }
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
      headless,
      args: ['--unlimited-storage', '--full-memory-crash-report']
    }

    if (executablePath) {
      launchOpts.executablePath = executablePath
      console.log(`\n${launchOpts.executablePath}\n`)
    }
    const browser = await puppeteer.launch(launchOpts)
    let tabs = await this.generateTabs(browser, count)
    let tabsLen = tabs.length
    let countPerTab = Math.floor(count / tabsLen)
    let lastCountOfTheTab = count - (countPerTab * tabsLen)
    let loadTasks = []
    let loadEvents = []
    for (let i = 0; i < tabsLen; i++) {
      let tab = tabs[i]
      let loadCountPerTab = countPerTab
      if (i < tabsLen - 1) loadCountPerTab = countPerTab + lastCountOfTheTab
      if (cookies) await tab.setCookie(...cookies)
      let settingTasks = [
        tab.setCacheEnabled(cache),
        tab.setJavaScriptEnabled(javascript),
        tab.setOfflineMode(!online),
        tab.setRequestInterception(false)
      ]
      if (viewport) {
        settingTasks.push(tab.setViewport(viewport))
      }
      if (useragent) {
        settingTasks.push(tab.setUserAgent(useragent))
      }

      await Promise.all(settingTasks)
      for (let j = 0; j < loadCountPerTab; j++) {
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
