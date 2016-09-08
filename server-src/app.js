import http from 'http'
import Koa from 'koa'
import path from 'path'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'
import session from 'koa-generic-session';
// import mysqlSession from 'koa-mysql-session';
import memcacheSession from 'koa-memcached';
import passport from 'koa-passport';
import _ from 'underscore';


//配置文件
import config from './config';

//注册账号验证规则
import passportRegister from './passport'; 


const app = new Koa()
const bodyparser = Bodyparser()

// logger
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// })

// middlewares
app.use(convert(bodyparser))//body数据解析中间件
app.use(convert(json()))
app.use(convert(logger()))

//session
app.keys = ['your-session-secret'];
app.use(convert(session({
  // store: new mysqlSession(config.sessionDb),
  store: memcacheSession(config.memcache),
  rolling: true,
  cookie: {
      maxage: config.cookieExpired
  }
})));


//passport
passportRegister(passport);
app.use(passport.initialize());
app.use(passport.session());


// Add Webpak Dev Middleware
import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import webpackConfig from '../webpack.config';

if (__DEVELOPMENT__) {
  const compile = webpack(webpackConfig)
  app.use(devMiddleware(compile, {
      // display no info to console (only warnings and errors)
      noInfo: false,

      // display nothing to the console
      quiet: true,

      // switch into lazy mode
      // that means no watching, but recompilation on every request
      lazy: false,

      // watch options (only lazy: false)
      watchOptions: {
          aggregateTimeout: 300,
          poll: true
      },

      // public path to bind the middleware to
      // use the same as in webpack
      publicPath: webpackConfig.output.publicPath,

      // custom headers
      headers: { "X-Custom-Header": "yes" },

      // options for formating the statistics
      stats: {
          colors: true
      }
  }));
  app.use(hotMiddleware(compile, {
       log: console.log,
       path: '/__webpack_hmr',
       heartbeat: 10 * 1000
  }));
  app.use(async (ctx, next) => {
    webpackIsomorphicTools.refresh();
    await next();
  })
};

// static
app.use(convert(koaStatic(path.join(__dirname, '../client'), {
  pathPrefix: ''
})))

//underscore写入全局方法
app.use( async (ctx, next) => {
  ctx.state._ = _;
  await next();
});

// views
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}))

// 500 error
koaOnError(app, {
  template: 'views/500.ejs'
})



// response router
// app.use(async (ctx, next) => {
//   await require('./routes').routes()(ctx, next)
// })
import router from './routes/router';
app.use(router.routes()).use(router.allowedMethods());

// 404
app.use(async (ctx) => {
  ctx.status = 404
  await ctx.render('404')
})

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

const port = parseInt(config.port || '3000')
const server = http.createServer(app.callback())

server.listen(port)
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(port + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})
server.on('listening', () => {
  console.log('==> 🌎  Koa2 server listening on port: %d in %s mode', port, app.env)
})

export default app