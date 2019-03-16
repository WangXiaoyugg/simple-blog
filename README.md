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

