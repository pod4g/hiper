# Hiper

> 🚀 A statistical analysis tool for performance testing 

业界第一个性能测试的统计分析工具

## The result

![Hiper](http://7xt9n8.com2.z0.glb.clouddn.com/hiper2.png)

## Build Setup

``` bash
# install
npm i hiper -g

# 加载指定的网页50次以查看性能，默认20次
hiper -n 50 http://www.didichuxing.com

```

## Config

如果要测试的网页需要登录，需要你先在你本地的浏览器下登录，然后在浏览器下取出所需要的cookie，配置一个`config.json`文件，然后在cli中带入这个文件即可。

新建`/home/config.json`,

假设登录的cookie需要下面几个字段。配置完毕之后。

```javascript
{
   // 我们也可以在配置文件中指定要测试的网页，这样就不用再命令行指定了
   "url": "http://www.didichuxing.com",
   // 把所有记录登录状态的cookie都写到配置这儿，为了演示方便只写了一个
   "cookies": [{
      "name": "token",
      "value": "9+cL224Xh6VuRT/MUJOPVDS0BaSYQ770",
      "domain": "example.com",
      "path": "/",
      "size": 294
   }]
}
```

``` bash
# 如果在/home/config.json配置了url，那么在命令行中无需再指定url
hiper -n 50 /home/config.json
```

## Usage

```bash
hiper --help
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 liyanfeng(pod4g)



