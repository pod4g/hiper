#! /usr/bin/env node
// 接受cli参数
// 装配opts
// 调用broswer拿到数据
// 调用分析模块
// 调用output
/**
 * Module dependencies.
 */
const Cli = require('../src/cli')
const Performance = require('../src/performance/one-tab')
const cli = new Cli()
const performance = new Performance()
// 接受cli参数
let opts = cli.monitor()

performance.run(opts).then(statisticData => {
   // console.log(statisticData)
})

// console.log(JSON.stringify(opts))



