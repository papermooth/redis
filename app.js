const Koa = require('koa')

// 1. 引入 ioredis
const Redis = require('ioredis')

// 2. 创建 Redis 客户端实例，指定要连接的 Redis 服务器
const redis = new Redis({
    port: 6379,         // redis 服务器的默认端口
    host: '127.0.0.1'   // redis 服务器的 IP 地址
})

const app = new Koa()

app.use(async ctx => {
    // 通过客户端实例，向 Redis 服务器发送数据操作命令，进行相关操作
    //（这等价于在命令行窗口中输入命令进行操作）
  
  	// 1) 设置数据
    await redis.set('my_key1', 'hello,world')
    await redis.set('my_key2', 'foo,bar')
    await redis.incr('my_num')
  
    // 2) 获取数据
    const myKey1Value = await redis.get('my_key1')
    console.log(myKey1Value)
    const myKey1Value2 = await redis.get('my_key2')
    console.log(myKey1Value2)
    ctx.body = '完成'
})

app.listen(3000)