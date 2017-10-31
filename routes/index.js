const Router = require('koa-router')
const sites = require('./sites')
const router = new Router()

router.use('/', sites.routes())

module.exports = router
