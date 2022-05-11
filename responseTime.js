const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    await next()
    // 这里为什么加response，我没想明白
    const time = ctx.response.get('X-Response-Time')
    console.log(`${ctx.url} - ${time}ms`)
})

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const time = Date.now() - start
    console.log(time, '222')
    ctx.set('X-Response-Time', `${time}ms`)
})

app.use(async (ctx, next) => {
    for(let i=0; i<100000; i++) {
        console.log(123)
    }
    ctx.body = "Hello World"
})


app.listen(3000, () => {
    console.log('监听端口！')
})