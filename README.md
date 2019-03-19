# 基于angular框架，结合Ng Alain开发的一个后台管理系统

## 使用

下载项目，执行以下命令

```bash
npm i
ng build delon-restful
ng serve -o
```

## 项目简介

1. proxy.config.json

此文件是配置反向代理，用于解决前端访问后端接口存在跨域问题。

2. projects -> delon-restful 文件

此项目下的文件夹，是对api的封装，可以通过 `ng build delon-restful` 安装到 `dist` 目录下。

## 注意事项

如需使用此框架构建自己的项目，请修改 `proxy.config.json` 文件，里面的 `url` 地址换成自己后端服务地址。
