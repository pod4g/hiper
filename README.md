## Hiper &middot; ![Build Status](https://img.shields.io/circleci/project/vuejs/vue/dev.svg) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![npm6.1.0](https://img.shields.io/npm/v/npm.svg) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> 🚀 A statistical analysis tool for performance testing 

令人愉悦的性能统计分析工具

The name is short for **Hi** **per**formance

## The output

![Hiper](http://7xt9n8.com2.z0.glb.clouddn.com/hiper5.png)

## Install

``` bash
# install
npm i hiper -g

# 加载指定的网页50次以查看性能，默认20次
hiper -n 50 http://www.didichuxing.com

```

## Usage

```bash
hiper --help

Usage: hiper [options] [url]

🚀 A statistical analysis tool for performance testing

Options:

   -v, --version                output the version number
   -n, --count <n>              指定加载次数（default: 20）
   -c, --config <path>          载入配置文件
   -u, --useragent <ua>         设置useragent
   -H, --headless [b]           是否使用无头模式（default: true）
   -e, --executablePath <path>  使用指定的chrome浏览器
   --no-cache                   禁用缓存（default: false）
   --no-javascript              禁用javascript（default: false）
   --no-online                  离线模式（defalut: false）
   -h, --help                   output usage information
```

## Config
```javascript
{
   // options 指向指定的chrome可执行程序，一般不用这项配置，除非你想测试特定版本的chrome
   "executablePath": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
   // required 测试的url
   "url": "http://www.didichuxing.com",
   // options 本次测试所需要的cookie。一般是登录信息的cookie。 Array | Object
   "cookies": [{
      "name": "token",
      "value": "9+cL224Xh6VuRT",
      "domain": "example.com",
      "path": "/",
      "size": 294,
      "httpOnly": true
   }],
   // options default: 20 测试次数
   "count": 100,
   // options default: true 是否使用无头模式 
   "headless": true,
   // options default: false 是否禁用cache 
   "noCache": false,
   // options default: false 是否禁用javascript
   "noJavascript": false,
   // options default: false 是否离线
   "noOnline": false,
   // options 设置useragent信息
   "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
   // options 设置viewport信息
   "viewport": {
      // options 视口宽度
      "width": 375,
      // options 视口高度
      "height": 812,
      // options default: 1 devicePixelRatio
      "deviceScaleFactor": 3,
      // options default: false 是否模拟成mobile
      "isMobile": false,
      // options default: false 是否支持touch事件
      "hasTouch": false,
      // options default: false 是否是横屏
      "isLandscape": false
   }
}
```

``` bash
# 载入上述配置文件
hiper -c /home/config.json
```

## Pain spot

我们开发完一个项目或者给一个项目做完性能优化以后，如何来衡量这个项目的性能是否达标？我们的常见方式是在`Dev Tool`中的`performance`和`network`中看数据，记录下几个关键的性能指标，然后刷新几次再看这些性能指标，
有时候我们发现，由于样本太少，受当前「网络」、「CPU」、「内存」的繁忙程度的影响很重，有时优化后的项目反而比优化前更慢。如果有一个工具，一次性地请求N次网页，然后把各个性能指标取出来求平均值，我们就能**非常准确**地知道这个优化是「正优化」还是「负优化」。并且，也可以做对比，拿到「具体优化了多少」的**准确数据**。这个工具就是为了解决这个痛点的。

> 同时，这个工具也是学习「浏览器加载渲染网页过程」和「性能优化」的一个利器，因此我们也可以把他作为一个**强大的**学习辅助工具，不至于让我们在样本过少的情况下得到错误的结论。

## Performance item

![timing](http://7xt9n8.com2.z0.glb.clouddn.com/timing.jpg)

## Roadmap

1. 更好的文档；
2. 国际化；
3. 增加页面加载的资源项的分析统计；
4. 更好的输出格式化；
5. 可以生成性能统计报告；
6. 数据可视化；

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 liyanfeng(pod4g)



