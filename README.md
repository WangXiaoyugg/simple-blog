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
  