#! /usr/bin/env node
// 接受cli参数
// 装配opts
// 调用broswer拿到数据
// 调用分析模块
// 调用output
/**
 * Module dependencies.
 */
// 命令行对象
const Cli = require('../src/cli')
// 性能数据生成对象
const Performance = require('../src/performance')
// 统计分析对象
const Analyzer = require('../src/analyzer')
const cli = new Cli()
const performance = new Performance()
const analyzer = new Analyzer()

// 监听命令行
let opts = cli.monitor()
performance.run(opts).then(statisticData => {
  analyzer.statistics(statisticData)
})

// console.log(JSON.stringify(opts))
