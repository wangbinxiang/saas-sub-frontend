#!/usr/bin/env node
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import path from 'path';
import webpackIsmorphicToolsConfig  from '../webpack-isomorphic-tools';

const project_base_path = path.resolve(__dirname, '..');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';


global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsmorphicToolsConfig).server(project_base_path, () => {
    	//server方法检测webpack-assets.json存在后才执行callback，app.js里加载了devMiddleware中间件会生成webpack-assets.json
     	// require(path.join(__dirname, '../server-src'))
    });
//载入服务端代码
require(path.join(__dirname, '../server-src'))

