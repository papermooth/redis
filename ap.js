const Koa = require('koa')

const app = new Koa()

// 1. 引入 ioredis
const Redis = require('ioredis')

// 2. 创建 Redis 客户端实例, 连接指定的 Redis 服务器
const redis = new Redis({
  port: 6379, // redis服务器默认端口号
  host: '127.0.0.1' // redis服务器的IP地址
})

app.use(async ctx => {
  // 以后思路: 费时的查询, 不用每次都去查, 先看看 redis 中存了没?
  // 如果存了, 直接用缓存的数据, 如果没有存, 就去查询, 并将查询的结果存到 redis 中即可

  // redis.get(key) 查询 (异步)
  // redis.set(key, value) 设置 (异步)
  let result = await redis.get('arrList')
  console.log(result)
  if (!result) {
    // 没有缓存过, 需要读数据库, 并且将结果缓存起来
    console.log('经过了很久很久的查询')
    const arr = [
      { id: 1, name: 'zs', age: 18 },
      { id: 2, name: 'ls', age: 19 },
      { id: 3, name: 'ww', age: 20 },
      { id: 4, name: 'zl', age: 21 },
    ]
    result = arr
    console.log('缓存到redis中')
    await redis.set('arrList', JSON.stringify(arr))
  } else {
    console.log('直接读缓存')
    result = JSON.parse(result)
  }

  ctx.body = result
})

app.listen(3000, () => console.log('服务器启动成功... 当前端口 3000'))