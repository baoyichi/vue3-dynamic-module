## 简介

基于vue3 + vite + Elementui Plus 的公共组件库。

## 功能

### 目录结构
```
industryInsightBiLabel
├─ .env.development     # 开发环境
├─ .env.init            # 初始化环境
├─ .eslintrc.cjs        # eslint
├─ .prettierrc.cjs      # prettierrc
├─ README.md   
├─ public               # 静态资源   
├─ ci-config            # 自动化部署配置文件   
├─ src                  # 源码  
│  ├─ api               # 接口请求
│  ├─ assets            # webpack打包资源
│  ├─ components        # 组件  
│  ├─ router            # 路由
│  ├─ store             # 全局store管理（pinia）
│  ├─ utils             # 全局公共方法
│  ├─ views             # 所有业务页面   
├─ tsconfig.json        # ts 编译配置   
├─ vite.config.ts       # vue-vite 配置

```

## HighLight

项目采用技术：

- Vue3 + Vite +  + TypeScript
- sass
- [Pinia2.0.3](https://pinia.web3doc.top/)
- [Element Plus](http://element-plus.org/zh-CN/component/button.html)
- [Echarts5](https://echarts.apache.org/zh/index.html)


### 启动服务
```text
多环境命令查看package.json → script：
    shell
    "dev": "vite --mode development",
    "build": "vite build"
```
