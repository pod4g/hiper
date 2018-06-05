## Hiper &middot; ![Build Status](https://img.shields.io/circleci/project/vuejs/vue/dev.svg) ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![npm6.1.0](https://img.shields.io/npm/v/npm.svg) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> 🚀 A statistical analysis tool for performance testing 

The name is short for **Hi** **per**formance <del>Or **Hi**gh **per**formance</del>

## The output

![Hiper](http://7xt9n8.com2.z0.glb.clouddn.com/hiper8.png)

## Install

``` bash
npm install hiper -g

# or use yarn:
# yarn global add hiper
```

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
 # We can omit the protocol header if has omited, the protocol header will be `http://`

 # The simplest usage
 hiper baidu.com

 # if the url has any parameter, surround the url with double quotes
 hiper "baidu.com?a=1&b=2"

 #  Load the specified page 100 times
 hiper -n 100 "baidu.com?a=1&b=2"

 #  Load the specified page 100 times whitout `cache`
 hiper -n 100 "baidu.com?a=1&b=2" --no-cache

 #  Load the specified page 100 times whitout `javascript`
 hiper -n 100 "baidu.com?a=1&b=2" --no-javascript
 
 #  Load the specified page 100 times whit `headless = false`
 hiper -n 100 "baidu.com?a=1&b=2" -H false

 #  Load the specified page 100 times whit set `useragent`
 hiper -n 100 "baidu.com?a=1&b=2" -u "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
```

## Config
```javascript
{
   // options Pointing to a specific chrome executable, this configuration is generally not required unless you want to test a specific version of chrome
   "executablePath": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
   // required The url you want to test
   "url": "http://www.baidu.com",
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

``` bash
# Load the above configuration file
hiper -c /home/config.json
```

## Pain spot

After we have developed a project or optimized the performance of a project, how do we measure the performance of this project? A common approach is to look at the data in the `performance` and `network` in the `Dev Tool`, record a few key performance metrics, and refresh them a few times before looking at those performance metrics,
Sometimes we find that due to the small sample size, the current **network/CPU/memory** load is heavily impacted, and sometimes the optimized project is slower than before the optimization. If there is a tool, a one-time web page to request many times, and then taking out the various performance indicators averaging, we can **very accurately** know the optimization is positive or negative optimization. In addition, you can also make a comparison and get **accurate data** about **how much you have optimized&**. This tool is designed to address this pain point.

> At the same time, this tool is also learning 「load rendering web browser process」 and 「performance optimization」 of a tool, so we can take him as a powerful tool for learning, not let us in the case of too little sample to get the wrong conclusion

## Performance item

![timing](http://7xt9n8.com2.z0.glb.clouddn.com/timing.jpg)

## Roadmap

1. Better documentation
2. i18n
3. Increase the analysis statistics of resource items loaded on the page
4. Statistical reports can be generated
5. Data visualization

## License

[MIT](http://opensource.org/licenses/MIT)

Welcome star and pr

Copyright (c) 2018 liyanfeng(pod4g)



