[English](./README.md) | **中文**

<p align="center"><img src="http://7xt9n8.com2.z0.glb.clouddn.com/hiper-logo-512.png" alt="Hiper" width="175"></p>

<p align="center">🚀 令人愉悦的性能统计分析工具</p>

<p align="center">
    <img src="https://img.shields.io/circleci/project/vuejs/vue/dev.svg" alt="">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="">
</p>

## Hiper

可以看成 **Hi** **per**formance的缩写 <del>或者 **Hi**gh **per**formance的缩写</del>

## 注意事项

请使用英语提issue

## 安装

``` bash
npm install hiper -g

# 或者使用 yarn:
# yarn global add hiper
```

## 输出

注意: `It takes period (m)s to load ...`. 这个 `period` 是**运行本次测试所用时间**. 因此，-n 越大，这个数越大

![Hiper](http://7xt9n8.com2.z0.glb.clouddn.com/hiper9.png)

## 性能指标

![timing](http://7xt9n8.com2.z0.glb.clouddn.com/PerformanceTiming.png)

| Key                            | Value                                        |
| :----------------------------- | :------------------------------------------- |
| DNS查询耗时                     | domainLookupEnd          - domainLookupStart |
| TCP连接耗时                     | connectEnd               - connectStart      |
| 第一个Byte到达浏览器的用时        | responseStart            - requestStart      |
| 页面下载耗时                     | responseEnd              - responseStart     |
| DOM Ready之后又继续下载资源的耗时 | domComplete              - domInteractive    |
| 白屏时间                         | domInteractive           - navigationStart   |
| DOM Ready 耗时                  | domContentLoadedEventEnd - navigationStart   |
| 页面加载总耗时                   | loadEventEnd             - navigationStart   |

https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming

## 使用

```bash
hiper --help

Usage: hiper [options] [url]

🚀 令人愉悦的性能统计分析工具

Options:

   -v, --version                输出版本号
   -n, --count <n>              指定加载次数（默认20次）
   -c, --config <path>          载入指定的配置文件
   -u, --useragent <ua>         设置useragent
   -H, --headless [b]           是否使用无头模式（默认为true）
   -e, --executablePath <path>  使用指定的Chrome浏览器
   --no-cache                   禁用缓存（默认为false）
   --no-javascript              禁用JavaScript (默认为false)
   --no-online                  禁用网络（默认为false）
   -h, --help                   输出帮助信息
```

用例

```bash
 # 当我们省略协议头时，默认会在url前添加`https://`

 # 最简单的用法
 hiper baidu.com

 # 如何url中含有任何参数，请使用双引号括起来
 hiper "baidu.com?a=1&b=2"

 #  加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2"

 #  禁用缓存加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" --no-cache

 #  禁JavaScript加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" --no-javascript
 
 #  使用GUI形式加载指定页面100次
 hiper -n 100 "baidu.com?a=1&b=2" -H false

 #  使用指定useragent加载网页100次
 hiper -n 100 "baidu.com?a=1&b=2" -u "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
```

## 配置

### 支持 `.json` 和 `.js` 格式的配置文件

1. **json**

```javascript
{
   // options 指向Chrome可执行程序，一般不需要配置此项，除非你想测试某个特定版本的Chrome
   "executablePath": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
   // required 要测试的url
   "url": "https://example.com",
   // options 本次测试需要用到的Cookies，通常是登录信息（即你测试的页面需要登录） Array | Object
   "cookies": [{
      "name": "token",
      "value": "9+cL224Xh6VuRT",
      "domain": "example.com",
      "path": "/",
      "size": 294,
      "httpOnly": true
   }],
   // options 测试次数 默认为20次
   "count": 100,
   // options 是否使用无头模式 默认为true
   "headless": true,
   // options 是否禁用缓存 默认为false 
   "noCache": false,
   // options 是否禁掉JavaScript 默认为false
   "noJavascript": false,
   // options 是否禁掉网络 默认为false
   "noOnline": false,
   // options 设置指定的useragent信息
   "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
   // options 设置视口信息
   "viewport": {
      // options
      "width": 375,
      // options
      "height": 812,
      // options devicePixelRatio 默认为1
      "deviceScaleFactor": 3,
      // options 是否模拟成mobile 默认为false
      "isMobile": false,
      // options 是否支持touch时间 默认为false
      "hasTouch": false,
      // options 是否是横屏模式 默认为false
      "isLandscape": false
   }
}
```

2. **js**

配置的JS文件允许人们使用ENV变量。例如，假设你想在经过身份验证的状态下测试站点。你可以通过ENV变量传递一些用于标识你的cookie，有一个基于JS的配置文件使这变得很简单。例如

```javascript
module.exports = {
    ....
    cookies:  [{
        name: 'token',
        value: process.env.authtoken,
        domain: 'example.com',
        path: '/',
        httpOnly: true
    }],
    ....
}
```

``` bash
# 载入上述配置文件（假设配置文件在/home/下）
hiper -c /home/config.json

# 或者你也可以使用js文件作为配置文件
hiper -c /home/config.js
```

## 痛点

我们开发完一个项目或者给一个项目做完性能优化以后，如何来衡量这个项目的性能是否达标？

我们的常见方式是在Dev Tool中的performance和network中看数据，记录下几个关键的性能指标，然后刷新几次再看这些性能指标。

有时候我们发现，由于样本太少，受当前「网络」、「CPU」、「内存」的繁忙程度的影响很重，有时优化后的项目反而比优化前更慢。

如果有一个工具，一次性地请求N次网页，然后把各个性能指标取出来求平均值，我们就能非常准确地知道这个优化是「正优化」还是「负优化」。

并且，也可以做对比，拿到「具体优化了多少」的准确数据。这个工具就是为了解决这个痛点的。

> 同时，这个工具也是学习「浏览器加载渲染网页过程」和「性能优化」的一个利器，因此我们也可以把他作为一个强大的学习辅助工具，不至于让我们在样本过少的情况下得到错误的结论。


## 蓝图

1. 更好的文档
2. 国际化
3. 页面依赖资源的统计分析
4. 生成性能统计报告
5. 数据可视化

## 如何贡献

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## 协议

[MIT](http://opensource.org/licenses/MIT)

欢迎Star和PR

Copyright (c) 2018 liyanfeng(pod4g)



