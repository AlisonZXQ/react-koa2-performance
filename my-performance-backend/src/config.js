let PROT = 9001;

// ORIGIN参数匹配是否是https
const IS_HTTPS = process.env.IS_HTTPS || 'FALSE'
let ORIGIN = `http://127.0.0.1:${PROT}`
if(IS_HTTPS ==='TRUE') ORIGIN = `https://127.0.0.1:${PROT}`

// 系统配置
let SYSTEM = {
	//允许调用接口的域名，用来检测防盗链
	ORIGIN: ORIGIN,

	// HTTP服务器端口号
	PROT: PROT,
	
	// 分页条数
	PAGESIZE: 50,

	DEBUG: false,
	
	// 后台登录账号和密码  （可替换为数据库用户密码登录方式）
	USERMSG:{
		USERNAME:'admin',
		PASSWORD:'123456789'
	},
}

let DB = {
	// 服务器地址
	HOST: 'localhost',

	// 数据库端口号     
	PROT: 3306,

	// 数据库用户名              
	USER: 'root',

	// 数据库密码    
	PASSWORD: '12201222',

	// 数据库名称    
	DATABASE: 'web-performance',

	// 默认"api_"
	PREFIX: 'web_',

	// 是否等待链接
	WAITFORCONNECTIONS: true,

	// 连接池数量
	POOLLIMIT: 20,

	// 排队限制数量
	QUEUELIMIT: 5,
}

let NODEMAILER = {
	// SMTP服务提供商域名
	HOST: '163',
	// 用户名/用户邮箱
	USER: '18758124836@163.com',
	// 邮箱密码
	PASSWORD: '1220and122',
}

module.exports = {
	SYSTEM,
	DB,
	NODEMAILER,
}

