const Koa = require('koa');
const KoaBody = require('koa-body')
const serve = require('koa-static')
const cors = require('koa-cors')
const path = require('path')
const session = require('koa-session')
const koa2Common = require('koa2-common')
const http = require('http')
const { SYSTEM } = require('./config');
const { back } = require('./routes');

const app = new Koa()

// 打印日志
app.on('error', (err, ctx) => {
    console.log(err)
});

app
    .use(session(app))
    .use(KoaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, '/upload')
        }
    }))
    .use(serve(__dirname + "/assets", {
        maxage: 365 * 24 * 60 * 60
    }))
    .use(koa2Common())
    .use(cors({
        origin: SYSTEM.ORIGIN,
        headers: 'Origin, X-Requested-With, Content-Type, Accept',
        methods: ['GET', 'PUT', 'POST'],
        credentials: true,
    }))
    .use(back.routes())
    .use(back.allowedMethods())
    .use((ctx, next) => {
        const start = new Date()
        return next().then(() => {
            const ms = new Date() - start
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
        })
    })
    
http.createServer(app.callback()).listen(SYSTEM.PROT);

console.log(`服务启动了：路径为：127.0.0.1:${SYSTEM.PROT}`, `orgin:${SYSTEM.ORIGIN}`)
