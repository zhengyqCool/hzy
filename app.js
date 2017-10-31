const path = require('path')
const Koa = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const staticService = require('koa-static')
const config = require('config')
const router = require('./routes')
const env = config.get('env')

const app = new Koa()

app.use(views(path.resolve(__dirname, './views'), {
  extension: 'ejs'
}))

app.use(bodyParser())
app.use(json())

if (env === 'development') {
  app.use(logger())
  app.use(staticService(path.resolve(__dirname, './dist')))
}

app.use(router.routes())

if (env === 'development') {
  app.on('error', (err, ctx) => {
    console.error('Server error: ', err, ctx)
  })
}

module.exports = app
