#saas-sub-frontend 
---

##执行环境

需要nodejs 6.10.0

安装yarn 

    npm install -g yarn

其他安装方式查看[https://yarnpkg.com/en/](https://yarnpkg.com/en/)
安装完成后代码根目录下执行

    yarn install
安装完成后可进入开发模式

##开发模式
---
### docker环境开发
需要最新版本docker  [https://www.docker.com/](https://www.docker.com/)
安装好docker后下载镜像 

    docker pull registry.cn-hangzhou.aliyuncs.com/wangbinxiang/saas-sub-fronted-dev:0.1.0
    
镜像下载完成后在代码根目录执行docker命令启动容器

    docker run -d -p 3010:3010 --name saas-sub-fronted-dev -v $PWD:/usr/src/app registry.cn-hangzhou.aliyuncs.com/wangbinxiang/saas-sub-fronted-dev:0.1.0

容器启动成功后可执行以下命令查看容器内程序运行log

    docker logs -ft --tail 50 saas-sub-fronted-dev

---

### 本机环境开发
直接使用nodejs 6.10.0版本开发
代码根目录下执行命令

    npm run dev
代码使用babel-node转义，nodemon监控代码修改后重启nodejs更新程序代码