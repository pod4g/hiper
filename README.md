**English** | [中文](./README.zh-CN.md)

<p align="center"><img src="http://7xt9n8.com2.z0.glb.clouddn.com/hiper-logo-512.png" alt="Hiper" width="175"></p>

<p align="center">🚀 A statistical analysis tool for performance testing</p>

<p align="center">
    <img src="https://img.shields.io/circleci/project/vuejs/vue/dev.svg" alt="">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="">
</p>

## Hiper

The name is short for **Hi** **per**formance <del>Or **Hi**gh **per**formance</del>

## Important

Hi guys, Please present your issue in English 

请使用英语提issue

## Install

``` bash
npm install hiper -g

# or use yarn:
# yarn global add hiper
```

## The output

Notice: `It takes period (m)s to load ...`. the `period` means **This test takes time**. So -n go up and the period go up. not a bug
 
![Hiper](http://7xt9n8.com2.z0.glb.clouddn.com/hiper9.png)

## PerformanceTiming

![timing](http://7xt9n8.com2.z0.glb.clouddn.com/PerformanceTiming.png)

| Key                            | Value                                        |
| :----------------------------- | :------------------------------------------- |
| DNS lookup time                | domainLookupEnd          - domainLookupStart |
| TCP connect time               | connectEnd               - connectStart      |
| TTFB                           | responseStart            - requestStart      |
| Download time of the page      | responseEnd              - responseStart     |
| After DOM Ready download time  | domComplete              - domInteractive    |
| White screen time              | domInteractive           - navigationStart   |
| DOM Ready time                 | domContentLoadedEventEnd - navigationStart   |
| Load time                      | loadEventEnd             - navigationStart   |

https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming

## Usage

```bash
hiper --help

Usage: hiper [options] [url]

🚀 A statistical analysis tool for performance testing

Options:

   -v, --version                output the version number
   -n, --count <n>              specified loading times (default: 20)
   -c, --config <path>          load the configuration file
   -u, --useragent <ua>         to set the useragent
   -H, --headless [b]           whether to use headless mode (default: true)
   -e, --executablePath <path>  use the specified chrome browser
   --no-cache                   disable cache (default: false)
   --no-javascript              disable javascript (default: false)
   --no-online                  disable network (defalut: false)
   -h, --help                   output usage information
```

For instance

```bash
 # We can omit the protocol header if has omitted, the protocol header will be `https://`

 # The simplest usage
 hiper baidu.com

 # if the url has any parameter, surround the url with double quotes
 hiper "baidu.com?a=1&b=2"

 #  Load the specified page 100 times
 hiper -n 100 "baidu.com?a=1&b=2"

 #  Load the specified page 100 times without `cache`
 hiper -n 100 "baidu.com?a=1&b=2" --no-cache

 #  Load the specified page 100 times without `javascript`
 hiper -n 100 "baidu.com?a=1&b=2" --no-javascript
 
 #  Load the specified page 100 times with `headless = false`
 hiper -n 100 "baidu.com?a=1&b=2" -H false

 #  Load the specified page 100 times with set `useragent`
 hiper -n 100 "baidu.com?a=1&b=2" -u "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
```

## Config

#### Support `.json` and `.js` config

1. **json**

```javascript
{
   // options Pointing to a specific chrome executable, this configuration is generally not required unless you want to test a specific version of chrome
   "executablePath": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
   // required The url you want to test
   "url": "https://example.com",
   // options Cookies required for this test. It's usually a cookie for login information Array | Object
   "cookies": [{
      "name": "token",
      "value": "9+cL224Xh6VuRT",
      "domain": "example.com",
      "path": "/",
      "size": 294,
      "httpOnly": true
   }],
   // options default: 20 Test times
   "count": 100,
   // options default: true Whether to use headless mode 
   "headless": true,
   // options default: false Disable cache 
   "noCache": false,
   // options default: false Disable javascript
   "noJavascript": false,
   // options default: false Disable network
   "noOnline": false,
   // options Set the useragent information
   "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
   // options Set the viewport information
   "viewport": {
      // options
      "width": 375,
      // options
      "height": 812,
      // options default: 1 devicePixelRatio
      "deviceScaleFactor": 3,
      // options default: false Whether to simulate mobile
      "isMobile": false,
      // options default: false Whether touch events are supported
      "hasTouch": false,
      // options default: false Is it horizontal or not
      "isLandscape": false
   }
}
```

2. **js**

Having a JS file for config allows people to use ENV variables. For example, let's say I want to test the site on an authenticated state. I can pass some cookie that is used to identify me through ENV variables and having a JS based config file makes this simple. For example

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
# Load the above configuration file (Let's say this file is under /home/)
hiper -c /home/config.json

# Or you can also use JS files for configuration
hiper -c /home/config.js
```

## Pain point

After we have developed a project or optimized the performance of a project, 

how do we measure the performance of this project?

A common approach is to look at the data in the `performance` and `network` in the `Dev Tool`, record a few key performance metrics, and refresh them a few times before looking at those performance metrics,

Sometimes we find that due to the small sample size, the current **Network/CPU/Memory** load is heavily impacted, and sometimes the optimized project is slower than before the optimization. 

If there is a tool, request web page many times, and then taking out the various performance indicators averaging, we can **very accurately** know the optimization is positive or negative. 

In addition, you can also make a comparison and get **accurate data** about **how much you have optimized**. This tool is designed to solve the pain point.

> At the same time, this tool is also a good tool for us to learn about the "browser's process of load and rendering" and "performance optimization", so that we don't get wrong conclusions when there are too few samples

## Roadmap

1. Better documentation
2. i18n
3. Increase the analysis statistics of resource items loaded on the page
4. Statistical reports can be generated
5. Data visualization

## Contributing

1. Fork it
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## License

[MIT](http://opensource.org/licenses/MIT)

Welcome Star and PR

Copyright (c) 2018 liyanfeng(pod4g)



