const figlet = require('figlet')
const clui = require('clui')
const clc = require('cli-color')
const Line = clui.Line

module.exports = class Outputer {
  output (data) {
    if (!data) return
    let { total } = data
    let {
      dnsTime,
      tcpTime,
      TTFB,
      pageDownloadTime,
      whiteScreenTime,
      DOMReadyTime,
      afterDOMReadyDownloadTime,
      loadTime
    } = total
    console.log('\n')
    console.log(figlet.textSync('Hiper'))
    console.log('\n')
    // console.log(`🚀 加载 ${global.__hiper__.url} ${global.__hiper__.count} 次 用时 ${(global.__hiper__.runInterval) / 1000} s`)
    console.log(`🚀 It takes ${(global.__hiper__.runInterval) / 1000} s to load \`${global.__hiper__.url}\` ${global.__hiper__.count} times`)
    console.log('\n')
    new Line()
      .padding(2)
      .column('DNS lookup time', 32)
      .column(dnsTime, 20, [clc.cyan])
      .fill()
      .output()
    new Line()
      .padding(2)
      .column('TCP connect time', 32)
      .column(tcpTime, 20, [clc.cyan])
      .fill()
      .output()
    new Line()
      .padding(2)
      .column('TTFB', 32)
      .column(TTFB, 20, [clc.cyan])
      .fill()
      .output()
    new Line()
      .padding(2)
      .column('Download time of the page', 32)
      .column(pageDownloadTime, 20, [clc.cyan])
      .fill()
      .output()
    new Line()
      .padding(2)
      .column('After DOM Ready download time', 32)
      .column(afterDOMReadyDownloadTime, 20, [clc.cyan])
      .fill()
      .output()
    new Line()
      .padding(2)
      .column('White screen time', 32)
      .column(whiteScreenTime, 20, [clc.cyan])
      .fill()
      .output()
    new Line()
      .padding(2)
      .column('DOM Ready time', 32)
      .column(DOMReadyTime, 20, [clc.cyan])
      .fill()
      .output()
    new Line()
      .padding(2)
      .column('Load time', 32)
      .column(loadTime, 20, [clc.cyan])
      .fill()
      .output()
    console.log('\n')
  }
}
