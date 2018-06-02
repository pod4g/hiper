# Hiper

> A statistical analysis tool for performance testing 

业界第一个性能测试的统计分析工具

## The result

![Hiper](http://7xt9n8.com2.z0.glb.clouddn.com/hiper.png)

## Build Setup

``` bash
# install
npm install hiper

# run test 加载指定的网页50次以查看性能
hiper -n 50 http://www.didichuxing.com

```

## Config

如果要测试的网页需要登录，需要你先在你本地的浏览器下登录，然后在浏览器下取出所需要的cookie，配置一个`config.json`文件，然后在cli中带入这个文件即可。

新建`/home/config.json`,

假设登录的cookie需要下面几个字段。配置完毕之后。

执行

``` bash
# 如果在/home/config.json配置了url，那么命令行中不需要再写
hiper -c 50 /home/config.json、
```

```javascript
{
   "url": "http://www.didichuxing.com", // 如果不想在明亮行书写url，那么写在配置文件里也是可以的
   "cookies": [{
      "name": "token",
      "value": "9+cL224Xh6VuRT/MUJOPVDS0BaSYQ770fyPluWILNMmDqzRnqo1Ns8UVArZvzJvIQJJKMTusu52rh66t36OvnWNaPYHCor3NtoDXJ63fJBN2LtI7xzVflueiSqJ9zMVwZZiPUFPoIRsizEiJydsQguTUu6H+Wq/x1mKa4W6WhVhss5k2D2F8Ab1A8f7CmoIvk9ltdQAYUV+Yns9kSwraW6ytY323ea3NqCP+Cd2zNRsHNF6vXHjBpa8q1Fy0NKXsLDxDiGgAAkwmaITWFK4LfyonvxTWY5Q==",
      "domain": "example.com",
      "path": "/",
      "size": 294,
      "httpOnly": true
   }, {
      "name": "username",
      "value": "liyanfeng",
      "domain": "example.com",
      "path": "/",
      "size": 17,
      "httpOnly": false
   }, {
      "name": "ticket",
      "value": "8c85557fccce70087fe7f3204dadaad5000112000",
      "domain": "example.com",
      "path": "/",
      "size": 47,
      "httpOnly": false
   }]
}
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 liyanfeng(pod4g)



