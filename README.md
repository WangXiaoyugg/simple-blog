# NodeJs 简易博客
1. 搭建开发环境
2. 初始化路由
3. blog/list 接口的开发

## 路由和API
API, 前后端，不同端（子系统）之间对接的术语
url (路由) `/api/blog/list` get, 输入，输出
路由
API的一部分
后端系统内部的一个模块

### MySQL
- mysql 介绍，安装，使用
  web server 关系型数据库
  开源免费下载
  轻量级，易学易用
  记住输入的root, 密码 
  navichat, workbench 可视化工具 
  `set SQL_SAFE_UPDATES = 0`
- nodejs连接 mysql
  安装mysql 第三方库
  封装mysql 常用操作
- API 连接 mysql


## 登录
- cookie
  
### cookie 是什么
- cookie 是存储在浏览器的一段字符串
- 跨域不共享
- 非结构化数据，k1=v1,k2=v2,k3=v3
- 每次发送http请求，会将请求域的cookie 带上
- server 可以修改cookie 返回给浏览器
- 浏览器通过js修改cookie,但有限制

### session 是什么
- cookie 会暴露username, 很危险
- cookie 中存储userid, server端对应username
- session 直接使用js变量，放在nodejs进程内存中 
- 进程的内存有限，访问量过大，内存暴增怎么处理
- 线上环境是多进程， 进程之间内内存无法共享
- 使用redis
  
## redis
- web server 最常用的缓存数据库，数据存放在内存中
- 相比于mysql, 访问速度快内存和硬盘不是一个数量级的
- 但是成本更高， 可存储的数剧量更小
- session 访问频繁，对性能要求极高
- session 可以不考虑断电丢失数据的问题（内存的硬伤）
- session 数据量不会太大(相比于mysql)
- 网站数据的操作频率不高，断电不能丢失，必须保留，数据量太大，内存成本太高 
- 为什么用redis? 不用redis会出现什么问题
- redis 适合什么场景？ mysql 适合什么场景
- mac `brew intsall redis`
  
## 前后端联调
- 准备前台页面
- 前台在8001 端口， 后台在 8000 端口
- nginx 高性能web服务器，开源免费
- 一般用于静态服务，负载均衡
- 反向代理
- mac `brew install nginx `
- nginx 配置位置， `/usr/local/etc/nginx/nginx.conf`
- 测试配置文件是否正确 `nginx -t`
- 启动nginx; 重启 `nginx -s reload`
- 停止 `nginx -s stop`

## 日志
- 利用stream 写日志
- 日志的拆分， 按时间划分日志文件
- linux的 crontab 命令， 即定时任务
- access.log 拷贝 重命名 2019-02-10.access.log
- 清空access.log 文件，继续积累日志
- 日志分析，分析浏览器的占比
- 日志按行存储，一行就是一条日志
- 使用nodejs的 readline, 基于stream

## 安全
- sql注入，窃取数据库内容，使用sql语句攻击，mysql 使用 escape 特殊字符转意
- xss攻击， 窃取前端cookie, 掺杂js执行代码, `<script>alert(document.cookis)</script>`, 通过转义实现， xss库
- 密码加密， 保障用户信息的安全, 数据库被用户攻破，最不应该泄漏就是用户信息，将密码加密
- DDOS攻击， 需要硬件和服务来支持

## 小结
- 处理http接口，GET/POST api ,controller和router 拆分
- 连接数据库， mysql,db,config 模块封装
- 实现登录，cookie, session, redis, nginx 反向代理
- 日志功能，stream, contrab, readline
- 安全, xss,sql注入，密码加密
- 服务端稳定性
- 内存CPU 优化和扩展
- 日志记录
- 集群和服务拆分，Nodejs web Server, mysql, redis 拆分

## express
- 入口文件的插件初始化
- 处理路由
- 中间件
- 初始化环境，插件和路由
- 开发接口
- 处理登录
- 处理日志，morgan写入access log
- 自定义日志，console.log, console.error
- 日志拆分，日志分析
  
### express 中间件
- 中间件是什么，
- 中间件怎么使用
- 中间件的执行顺序
- 中间件原理
- app.use 的注册中间件，收集中间件
- 遇到http请求，根据path 和method判断触发那些中间件
- 实现next机制，即上一步通过next执行下一步
- 实现一个简单的express
- 阅读express 使用到第三方包源码和实现


## koa
- 原生支持async/await
- egg.js等企业级框架底层基于koa
- koa是未来的趋势

### async/await 小结
- await 后面接 promise对象
- await 必须包裹在async 函数内
- async 函数返回的也是一个promise函数
- try-catch 截获promise的值

### koa2简介
- 安装脚手架，`npm i koa-generator -g`
- 初始化代码
- 介绍中间件