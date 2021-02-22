const moment = require('moment');
const sql = require('node-transform-mysql')
const { util, mysql, transaction } = require('../tool');

class user {
    //初始化对象

    // 登陆
    async userLogin(ctx) {
        try {
            let userName = ctx.request.body.userName
            let passWord = ctx.request.body.passWord

            if (!userName || !passWord) {
                ctx.body = util.result({
                    code: 402,
                    message: '用户名或密码有误!'
                });
                return
            }

            // 判断用户名是否存在
            let sqlstr = sql
                .table('web_user')
                .where({ userName: userName })
                .select()
            let userMsg = await mysql(sqlstr);
            if (!userMsg || !userMsg.length) {
                ctx.body = util.result({
                    code: 402,
                    message: '用户名不存在!'
                });
                return
            }
            if (userMsg[0].passWord !== passWord) {
                ctx.body = util.result({
                    code: 402,
                    message: '密码错误!'
                });
                return
            }

            ctx.cookies.set('userName', userName)
            ctx.cookies.set('token', userMsg[0].token)

            ctx.body = util.result({
                result: userMsg[0]
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 402,
                message: '系统错误!'
            });
            return '';
        }
    }

    // 用户注册
    async userRegister(ctx) {
        try {
            let userName = ctx.request.body.userName
            let passWord = ctx.request.body.passWord
            let createTime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')

            if (!userName || !passWord) {
                ctx.body = util.result({
                    code: 402,
                    message: '用户名或密码有误!'
                });
                return
            }

            // 检测用户是否存在
            let length = await new user().isUserHave(userName)
            if (length) {
                ctx.body = util.result({
                    code: 402,
                    message: '用户名已存在!'
                });
                return
            }

            let timestamp = new Date().getTime();
            let token = util.signwx({
                username: userName,
                password: passWord,
                timestamp: timestamp,
                random: util.randomString()
            }).paySign;

            let sqlstr = sql
                .table('web_user')
                .data({ userName: userName, passWord: passWord, createTime: createTime, token: token })
                .insert()

            let result = await mysql(sqlstr);

            ctx.body = util.result({
                result: result
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 402,
                message: '系统错误!'
            });
            return '';
        }
    }

    // 查询用户是否存在
    async isUserHave(userName) {
        let sqlstr = sql
            .table('web_user')
            .where({ userName: userName })
            .select()
        let result = await mysql(sqlstr);
        return result.length
    }

    // 查询用户信息
    async getUserInfo(ctx) {
        try {
            let username = ctx.cookies.get('userName');

            let sqlstr = sql
                .table('web_user')
                .where({ userName: username })
                .select()
            let result = await mysql(sqlstr);

            ctx.body = util.result({
                result: result
            });

        } catch (err) {
            console.log(err)
            ctx.body = util.result({
                code: 402,
                message: '登陆失败!'
            });
            return '';
        }
    }

    // 退出登录
    async loginOut(ctx) {
        ctx.cookies.set('userName', null)
        ctx.cookies.set('token', null)

        ctx.body = util.result({
            result: '成功'
        });
    }

    async test(ctx) {
        let arr = [];
        let sqlstr = sql
            .table('test1')
            .data({ name: 'wing' })
            .insert();
        let sqlstr2 = sql
            .table('test2')
            .data({ age: 18 })
            .insert();
        arr.push(sqlstr);
        arr.push(sqlstr2);

        console.log(arr)
        try {
            await transaction(arr)
            ctx.body = util.result({
                data: '成功'
            });
        } catch (err) {
            ctx.body = util.result({
                code: 44444,
                desc: '失败'
            });
        }
    }
}

module.exports = new user();

