import http from 'http'
import Koa from 'koa'
import path from 'path'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStaticCache from 'koa-static-cache'
import koaerro from 'koa-error'
import session from 'koa-generic-session'
import compress from 'koa-compress'
import memcacheSession from 'koa-memcached'
// import passport from 'koa-passport'
import config from 'config'
import compose from './compose'
import webpack from 'webpack'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import webpackConfig from '../webpack.config'
// import passportRegister from './passport' //注册账号验证规则

const app = new Koa()
app.use(compress())
// static
// 缓存一个月
app.use(convert(koaStaticCache(path.join(__dirname, '../client'), {
  maxAge: 2592000
})))

// middlewares
app.use(Bodyparser())// body数据解析中间件
app.use(convert(json()))
app.use(convert(logger()))

// session
app.keys = ['saas-sub-frontend']
app.use(convert(session({
  key: 'saas-sub-frontend',
  store: memcacheSession(config.get('memcache')),
  rolling: true,
  cookie: {
    maxage: config.get('cookieExpired')
  }
})))

// passport 转移到compose里
// passportRegister(passport);
// app.use(passport.initialize());
// app.use(passport.session());

// Add Webpak Dev Middleware

if (__DEVELOPMENT__) {
  const pollOption = config.get('os') === 'win' ? 100 : false
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
      aggregateTimeout: 500,
      poll: pollOption
    },

      // public path to bind the middleware to
      // use the same as in webpack
    publicPath: webpackConfig.output.publicPath,

      // custom headers
    headers: { 'X-Custom-Header': 'yes' },

      // options for formating the statistics
    stats: {
      colors: true
    }
  }))
  app.use(hotMiddleware(compile, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))
  app.use(async (ctx, next) => {
    webpackIsomorphicTools.refresh()
    await next()
  })
};

// views
app.use(views(
  path.join(__dirname, '../views'),
  {
    extension: 'ejs',
    options: {
      cache: !__DEVELOPMENT__
    }
  })
)

// 500 error
app.use(convert(koaerro({
  engine: 'ejs',
  template: 'views/500.ejs'
})))

if (__DEVELOPMENT__) {
  app.use(async (ctx, next) => {
    await require('./compose')(ctx, next)
  })
} else {
  app.use(compose)
}

// import { handlerHostToSubId } from './middlewares/handlerHostToSubId';
// app.use(handlerHostToSubId);

// app.use(isInWechat);

// import { authWechatSign } from './middlewares/auth/wechat';
// app.use(authWechatSign);

// response router
// app.use(async (ctx, next) => {
//   await require('./routes').routes()(ctx, next)
// })
// import router from './routes/router';
// app.use(router.routes()).use(router.allowedMethods());

// app.use(async (ctx, next) => {
//   await require('./routes/router').routes()(ctx, next)
// })

// 404
app.use(async (ctx) => {
  ctx.status = 404
  await ctx.render('404')
})

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

process.on('uncaughtException', function (err) {
  console.error('Unexpected exception: ' + err)
  console.error('Unexpected exception stack: ' + err.stack)
  // Do something here:
  // Such as send a email to admin
  process.exit(1)
})

const port = parseInt(config.get('port') || '3000')
const server = http.createServer(app.callback())

server.listen(port, '0.0.0.0')
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
  console.log('==> 🌎  saas-sub-frontend server listening on port: %d in %s mode', port, app.env)
})

export default app
