// 校验用户名的
export function validatePass(field, value, callback) {
	// field字段，value值，callback回调函数
	if (!value) {
		// 提示输入内容
		return callback(new Error('请输入内容'))
	}
	// 字母数字下划线4-10位
	if (!/^\w{4,10}$/.test(value)) {
		// 不合法，提醒并返回
		return callback(new Error('用户名要求字母数字下划线4-10位'))
	}
	// 默认也要执行
	callback()
}
// 校验密码的
export function validatePass1(field, value, callback) {
	// 不为空
	if (!value) {
		return callback(new Error('请输入内容'))
	}
	// 必须包含字母和数字
	if (!/[a-zA-Z].*\d|\d.*[a-zA-Z]/.test(value)) {
		return callback(new Error('密码要求包含字母和数字'))
	}
	// 校验通过，执行回调函数
	callback();
}
//验证手机号码
export function validatePass2(field, value, callback) {
	//不为空
	if (!value) {
		return callback(new Error('请输入手机号码'))
	}
	//11位数字
	if(!(/^1[3456789]\d{9}$/.test(value))){ 
        return callback(new Error('请输入有效11位数字'))
	} 
	// 校验通过，执行回调函数
	callback();
}