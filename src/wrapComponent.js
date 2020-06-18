const defaultChecker = function() {
	return true
}

/**
 * 使用函数式组件包装原组件，内部实现权限判断，无权限不渲染
 * @param {*} Vue
 * @param {*} conf
 * {
 *  name: name, // 组件名
 *  confing: component, // 组件配置对象
 *  checker: fn, // 组件权限校验函数，返回false则不渲染原组件
 *  regToGlobal: true // 是否注册为全局组件
 * }
 * @return {Object} functional component
 */
const wrapComponent = function(Vue, conf) {
	if (!conf.config) {
		conf = {
			config: conf
		}
	}
	const { name = conf.config.name, config, checker = defaultChecker, regToGlobal = false } = conf
	if (!name) {
		console.error('[vue auth] wrap函数在包裹组件时需要你提供组件名')
		return
	}
	const wrapComponent = {
		functional: true,
		vueAuth: true, // 标记，防止重复注册
		props: {
			// 权限字段
			auth: {
				default() {
					return true
				}
			}
		},
		render(h, context) {
			return checker(context.props.auth)
				? context.parent.$createElement(config, context.data, context.children)
				: null
		}
	}
	regToGlobal && Vue.component(name, wrapComponent)
	return wrapComponent
}

export default wrapComponent
