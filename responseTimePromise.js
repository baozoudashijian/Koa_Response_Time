const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
    next().then(() => {
        let time = ctx.response.get('Response-Time')
        console.log('顺序3')
        console.log(time)
    })
})

app.use((ctx, next) => {
    const time = Date.now()
    next().then((res) => {
        console.log('顺序2')
        ctx.set( 'Response-Time', Date.now() - time)
    })
})
app.use((ctx, next) => {
    for(let i=0; i<100000; i++) {
        console.log(456)
    }
    console.log('顺序1')
    ctx.body = "响应完成!"
})


app.listen(3000, () => {
    console.log('监听端口3000')
})