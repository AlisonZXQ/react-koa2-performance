const { util } = require('../tool');

class common {

    // 验证github来源信息
    async checkGitHubInfo(ctx, next) {
        let req = ctx.request.body

        if (!req.state || req.state !== 'merged') {
            console.log('不是出于合并状态!')
            return false
        }

        if (!req.target_branch || req.target_branch !== 'master') {
            console.log('提交代码的分支不是master分支!')
            return false
        }
        if (req.password !== 'qimingxing') {
            console.log('请求地址验证密码有误!')
            return false
        }

        return next();
    };

    // 验证来源 && 验证签名
    async checkRequestUrl(ctx, next) {
        let verSource = util.verSource(ctx)
        let checkSigin = util.checkSiginHttp(ctx);
        if (verSource && checkSigin) {
            return next();
        } else {
            console.log('域名来源验证有误')
        }
    };

    // 验证来源 && 验证签名 && 验证是否登录
    async checkIsLogin(ctx, next) {
        let username = ctx.cookies.get('userName');
        let secretKey = ctx.cookies.get('token');

        if (!username || !secretKey) {
            ctx.body = util.result({
                code: 401,
                desc: "该用户未登录！"
            });
        }

        return next();
    }

    // 验证登录是否有systemId
    async checkHaveSystemId(ctx, next) {
        let systemId = ctx.cookies.get('systemId');
        let username = ctx.cookies.get('userName');
        let secretKey = ctx.cookies.get('token');

        if (!username || !secretKey) {
            ctx.body = util.result({
                code: 401,
                message: "该用户未登录！"
            });
        }

        if (!secretKey) {
            ctx.body = util.result({
                code: 402,
                message: "用户登录异常，请重新登录！"
            });
            return;
        }

        if (!(systemId + '')) {
            ctx.body = util.result({
                code: 402,
                message: "systemId不能为空！"
            });
            return;
        }

        return next();
    }

}

module.exports = new common();

