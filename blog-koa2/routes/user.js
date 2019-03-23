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
module.exports = router