const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {

  const {password, username} = ctx.request.body;
  ctx.body = {
      errno: 0,
      data: {
          password,
          username,
      }
  }  
})

router.get('/session-test', async function (ctx, next) {
    if(ctx.session.count === null) {
        ctx.session.count = 0
    }
    ctx.session.count++
    ctx.body = {
        count: ctx.session.count,
    }
  })
module.exports = router